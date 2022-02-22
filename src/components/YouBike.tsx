import type { LatLng, AreaShortForm, AreaConfigValue } from '@/utils/constant'
import { StationDetail } from '@/interfaces'

import React from 'react'
import * as R from 'ramda'
import useSWRImmutable from 'swr/immutable'
import apiFetcher from '@/utils/api-client'
import { areaConfig, CENTER_OF_TAIWAN } from '@/utils/constant'
import {
  searchStationByName,
  getStationMarkerIcon,
  filterIncorrectStation,
  getTooltipDirection,
  calculateTooltipOffset,
} from '@/utils/station-helpers'

import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMapEvents,
  Tooltip,
  LayersControl,
  LayerGroup,
  useMap,
  Circle,
  CircleMarker,
  FeatureGroup,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import { useImmer } from 'use-immer'
import { isObject } from '@/utils/helpers'

type BikeType = 1 | 2

const DEFAULT_ZOOM = 8

const ZOOM_LEVEL_MAP = Object.freeze({
  wholeTaiwan: 8,
  markerShow: 11,
  cityChange: 14,
  placeSearch: 16,
  max: 16,
})

const OSM_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
}

interface CustomStation extends StationDetail {
  markerIcon: string
  areaName: string
}

function GetIcon(_iconUrl) {
  return L.icon({
    iconUrl: _iconUrl,
    iconSize: [30, 30],
  })
}

type YouBikeMapProps = {
  displayType: BikeType
}

const YouBikeMap = (props: YouBikeMapProps) => {
  const { displayType = 1 } = props

  const [map, setMap] = React.useState<L.Map>(null)
  const [currentZoomLevel, setCurrentZoomLevel] = React.useState<number>(0)

  const [selectedStation, updateSelectedStation] = useImmer<CustomStation>(null)

  // const [stationAll, updateStationAll] = useImmer<CustomStation[]>([])
  const [displayStationYb1, updateDisplayStationYb1] = useImmer<CustomStation[]>([])
  const [displayStationYb2, updateDisplayStationYb2] = useImmer<CustomStation[]>([])

  const {
    data: stationYb1,
    error: errorYb1,
    isValidating: isValidatingYb1,
  } = useSWRImmutable<StationDetail[]>('/json/station-yb1.json', apiFetcher)

  const {
    data: stationYb2,
    error: errorYb2,
    isValidating: isValidatingYb2,
  } = useSWRImmutable<StationDetail[]>(`/json/station-yb2.json`, apiFetcher)

  function processingStationData(arr: StationDetail[]): StationDetail[] {
    if (!arr || !(arr?.length > 0)) return []

    const tempArr = (arr ? filterIncorrectStation(R.clone(arr)) : []) as []

    const processingData = s => {
      const area = R.values(areaConfig).find(area => area.areaCode === s.area_code)
      return {
        ...s,
        markerIcon: getStationMarkerIcon(s),
        areaName: area.name,
      }
    }

    const result = R.map(processingData, tempArr)

    return result
  }

  React.useEffect(() => {
    const result = processingStationData(stationYb1)
    if (result?.length > 0) {
      updateDisplayStationYb1(draft => result)
    }
  }, [stationYb1, stationYb2])

  React.useEffect(() => {
    const result = processingStationData(stationYb2)
    if (result?.length > 0) {
      updateDisplayStationYb2(draft => result)
    }
  }, [stationYb2])

  // React.useEffect(() => {
  //   console.log(displayStationYb1)
  // }, [displayStationYb1])

  // React.useEffect(() => {
  //   console.log(displayStationYb2)
  // }, [displayStationYb2])

  // React.useEffect(() => {
  //   console.log(`displayType: ${displayType}`)
  // }, [displayType])

  React.useEffect(() => {
    console.log(`currentZoomLevel: ${currentZoomLevel}`)
  }, [currentZoomLevel])

  React.useEffect(() => {
    if (!map) return

    map.on('zoomend', function () {
      setCurrentZoomLevel(prev => map.getZoom())
    })
  }, [map])

  const yb1MarkerComponents = React.useMemo(() => {
    return displayStationYb1?.map(station => {
      const position = { lat: +station.lat, lng: +station.lng }

      return (
        <Marker
          key={station.station_no}
          position={position}
          icon={GetIcon(station.markerIcon)}
          eventHandlers={{
            click: e => {
              console.log(station)
              updateSelectedStation(draft => station)
            },
          }}
        >
          {/* <Tooltip>
            <span>
              {station.name_tw}
              {`(${station.address_tw})`}
            </span>
          </Tooltip> */}
        </Marker>
      )
    })
  }, [displayStationYb1])

  const yb2MarkerComponents = React.useMemo(() => {
    return displayStationYb2?.map(station => {
      const position = { lat: +station.lat, lng: +station.lng }

      return (
        <Marker
          key={station.station_no}
          position={position}
          icon={GetIcon(station.markerIcon)}
          eventHandlers={{
            click: e => {
              console.log(station)
              updateSelectedStation(draft => station)
            },
          }}
        >
          {/* <InfoWindowPopup station={station} /> */}
          {/* <Tooltip>
            <span>
              {station.name_tw}
              {`(${station.address_tw})`}
            </span>
          </Tooltip> */}
        </Marker>
      )
    })
  }, [displayStationYb2])

  function panToWithZoomLevel(position: LatLng, zoomLevel: number = ZOOM_LEVEL_MAP.wholeTaiwan) {
    if (!map || Object.keys(position)?.length < 2) return

    // map.panTo(latlng)
    // map.setZoom(zoomLevel)
    map.setView(position, zoomLevel)
  }

  return (
    <>
      <div className="station-map-container">
        <MapContainer
          className="osm"
          center={CENTER_OF_TAIWAN}
          zoom={ZOOM_LEVEL_MAP.wholeTaiwan}
          minZoom={ZOOM_LEVEL_MAP.wholeTaiwan}
          maxZoom={ZOOM_LEVEL_MAP.max}
          whenCreated={setMap}
        >
          <TileLayer url={OSM_CONFIG.url} attribution={OSM_CONFIG.attribution} />
          <FullscreenControl />

          {selectedStation && (
            <InfoWindowPopup station={selectedStation} onCloseFn={() => updateSelectedStation(draft => null)} />
          )}

          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay
              name="YouBike 1.0"
              checked={displayType === 1 && currentZoomLevel >= ZOOM_LEVEL_MAP.markerShow}
            >
              <LayerGroup>
                <MarkerClusterGroup
                  showCoverageOnHover={true}
                  disableClusteringAtZoom={15}
                  spiderfyOnMaxZoom={false}
                  iconCreateFunction={cluster => {
                    return new L.DivIcon({
                      className: 'marker-cluster marker-cluster-custom-yb1',
                      html: `<div><span>${cluster.getChildCount()}</span></div>`,
                      iconSize: new L.Point(40, 40),
                    })
                  }}
                >
                  {yb1MarkerComponents}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay
              name="YouBike 2.0"
              checked={displayType === 2 && currentZoomLevel >= ZOOM_LEVEL_MAP.markerShow}
            >
              <LayerGroup>
                <MarkerClusterGroup
                  showCoverageOnHover={true}
                  disableClusteringAtZoom={15}
                  spiderfyOnMaxZoom={false}
                  iconCreateFunction={cluster => {
                    return new L.DivIcon({
                      className: 'marker-cluster marker-cluster-custom-yb2',
                      html: `<div><span>${cluster.getChildCount()}</span></div>`,
                      iconSize: new L.Point(40, 40),
                    })
                  }}
                >
                  {yb2MarkerComponents}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            {currentZoomLevel < ZOOM_LEVEL_MAP.markerShow && (
              <LayersControl.Overlay checked name="Layer group with circles">
                <LayerGroup>
                  {Object.keys(areaConfig)?.map(key => {
                    const areaObj = areaConfig[key] as AreaConfigValue

                    return (
                      <FeatureGroup key={key}>
                        <CircleMarker
                          center={areaObj.position}
                          radius={35}
                          pathOptions={{
                            color: '#ffef00',
                            // opacity: 1,
                            fillColor: '#fff',
                          }}
                          eventHandlers={{
                            click: e => {
                              panToWithZoomLevel(areaObj.position, ZOOM_LEVEL_MAP.markerShow)
                            },
                          }}
                        >
                          <Tooltip
                            permanent={true}
                            interactive={true}
                            direction={getTooltipDirection(key)}
                            offset={calculateTooltipOffset(areaObj)}
                          >
                            <div
                              style={{
                                // color: '#7F7F7F',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '1.2em',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {areaObj.name} <br />
                              {/* xxx 站 */}
                            </div>
                          </Tooltip>
                        </CircleMarker>
                      </FeatureGroup>
                    )
                  })}
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </MapContainer>
      </div>
    </>
  )
}

export default YouBikeMap

type InfoWindowPopupProps = {
  station: CustomStation
  onCloseFn?: () => void
}

const InfoWindowPopup = (props: InfoWindowPopupProps) => {
  const { station = null, onCloseFn = undefined } = props

  const position = { lat: +station.lat, lng: +station.lng }

  if (!isObject(station)) return null

  return (
    <Popup
      className="popupCustom"
      position={position}
      onClose={() => {
        if (onCloseFn) onCloseFn()
      }}
    >
      <p>租賃站點查詢 :{station?.name_tw || ''}</p>
      <p>站點位置 : {station?.address_tw || ''}</p>
    </Popup>
  )
}
