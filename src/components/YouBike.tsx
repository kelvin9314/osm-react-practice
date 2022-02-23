import type { LatLng, AreaShortForm, AreaConfigValue } from '@/utils/constant'
import { StationDetail, FrontAreaDetail, StationCountResponse, AreaBikeType } from '@/interfaces'

import React from 'react'
import * as R from 'ramda'
import useSWRImmutable from 'swr/immutable'
import apiFetcher from '@/utils/api-client'
import { AREA_MAP, CENTER_OF_TAIWAN, AREA_NAME_BY_ID } from '@/utils/constant'
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

interface AreaMarkerByBikeType {
  areaCode: string
  name: string
  shortForm: AreaShortForm
  position: {
    lat: number
    lng: number
  }
  stationAmount: number
}

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
  displayBikeType: BikeType
}

const YouBikeMap = (props: YouBikeMapProps) => {
  const { displayBikeType = 1 } = props

  const { data: stationCountResponse, error: stationCountError } = useSWRImmutable<StationCountResponse>(
    '/api/front/station/count',
    apiFetcher
  )
  const { data: areaAllResponse, error: areaInfoError } = useSWRImmutable<FrontAreaDetail[]>(
    '/json/area-all.json',
    apiFetcher
  )

  const [map, setMap] = React.useState<L.Map>(null)
  const [currentZoomLevel, setCurrentZoomLevel] = React.useState<number>(0)

  const [selectedStation, updateSelectedStation] = useImmer<CustomStation>(null)

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
      const area = R.values(AREA_MAP).find(area => area.areaCode === s.area_code)
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
  //   console.log(`displayBikeType: ${displayBikeType}`)
  // }, [displayBikeType])

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

  // NOTE: for area(city) Circle Marker
  const areaMarkerByBikeType: AreaMarkerByBikeType[] | [] = React.useMemo(() => {
    if (!stationCountResponse || !areaAllResponse) return []

    const { retVal: countsInfos, retMsg: countMsg } = stationCountResponse
    if (!countsInfos || countsInfos?.length === 0) {
      console.error(countMsg)
      return []
    }

    if (!areaAllResponse || areaAllResponse?.length === 0) {
      console.error('"/json/area-all.json" from API is MISSING !!')
      return []
    }

    const definedAreaCodes = Object.keys(AREA_NAME_BY_ID) as string[]
    const currentBikeType = displayBikeType.toString() as AreaBikeType
    const filterAreas = (a: FrontAreaDetail) =>
      definedAreaCodes.includes(a.area_code) && a.bike_type.includes(currentBikeType)

    const processingData = (a: FrontAreaDetail): AreaMarkerByBikeType => {
      const areaCount = countsInfos.find(c => c.area_code === a.area_code)
      return {
        areaCode: a.area_code,
        name: a.area_name_tw,
        shortForm: AREA_NAME_BY_ID[a.area_code].shortForm,
        position: {
          lat: displayBikeType === 1 ? Number(a.lat) : Number(a.lat2),
          lng: displayBikeType === 2 ? Number(a.lng) : Number(a.lng2),
        },
        stationAmount: !areaCount ? 0 : displayBikeType === 1 ? areaCount.yb1 : areaCount.yb2,
      }
    }
    const filteredAreas = R.map(processingData, R.filter(filterAreas, areaAllResponse))
    console.log(filteredAreas)
    return filteredAreas
  }, [stationCountResponse, areaAllResponse, displayBikeType])

  function panToWithZoomLevel(position: LatLng, zoomLevel: number = ZOOM_LEVEL_MAP.wholeTaiwan) {
    if (!map || Object.keys(position)?.length < 2) return

    map.setView(position, zoomLevel, { animate: true })
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
              checked={displayBikeType === 1 && currentZoomLevel >= ZOOM_LEVEL_MAP.markerShow}
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
              checked={displayBikeType === 2 && currentZoomLevel >= ZOOM_LEVEL_MAP.markerShow}
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
                  {areaMarkerByBikeType?.map(areaObj => {
                    // const areaObj = AREA_MAP[key] as AreaConfigValue

                    return (
                      <FeatureGroup key={areaObj.areaCode}>
                        <CircleMarker
                          center={areaObj.position}
                          radius={10}
                          pathOptions={{
                            color: 'transparent',
                            // opacity: 1,
                            // fillColor: '#ffef00',
                            // fillOpacity: 1,
                          }}
                          eventHandlers={{
                            click: e => {
                              panToWithZoomLevel(areaObj.position, ZOOM_LEVEL_MAP.cityChange)
                            },
                          }}
                        >
                          <Tooltip
                            className="map-point-f2e-edit-osm"
                            permanent={true}
                            interactive={true}
                            direction={getTooltipDirection(areaObj.shortForm)}
                            offset={calculateTooltipOffset(areaObj)}
                          >
                            <div className="area-text">
                              {areaObj.name} <br />
                              {areaObj.stationAmount} 站
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
