import type { LatLng } from '@/utils/constant'
import { StationDetail } from '@/interfaces'

import React from 'react'
import * as R from 'ramda'
import useStations from '@/hooks/useStations'
import { areaConfig, zoomLevelConfig, CENTER_OF_TAIWAN } from '@/utils/constant'
import { searchStationByName, getStationMarkerIcon, filterIncorrectStation } from '@/utils/station-helpers'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { FullscreenControl } from 'react-leaflet-fullscreen'

const DEFAULT_ZOOM = 8

const OSM_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
}

interface CustomStation extends StationDetail {
  markerIcon: string
  areaName: string
}

const OpenStreetMap = () => {
  const [zoomLevel, setZoomLevel] = React.useState(DEFAULT_ZOOM)
  const [selectedBikeType, setSelectedBikeType] = React.useState<'yb1' | 'yb2'>('yb1')
  const { data: rawStations, isError, isLoading: isStationFetching } = useStations()

  const { stationAll, stationByBikeType } = React.useMemo<{
    stationAll: CustomStation[]
    stationByBikeType: CustomStation[]
  }>(() => {
    const yb1 = (rawStations.yb1 ? filterIncorrectStation(R.clone(rawStations.yb1)) : []) as []
    const yb2 = (rawStations.yb2 ? filterIncorrectStation(R.clone(rawStations.yb2)) : []) as []

    // console.log(yb1)
    const processingData = s => {
      const area = R.values(areaConfig).find(area => area.areaCode === s.area_code)
      return {
        ...s,
        markerIcon: getStationMarkerIcon(s),
        areaName: area.name,
      }
    }
    const stationAll = R.map(processingData, R.concat(yb1, yb2))
    const stationByBikeType = R.map(processingData, selectedBikeType === 'yb1' ? yb1 : yb2)
    console.log(stationByBikeType.slice(0, 20))

    return { stationAll, stationByBikeType }
  }, [rawStations, selectedBikeType])

  // React.useEffect(() => {
  //   console.log(isStationFetching)
  //   console.log(stationAll)
  // }, [isStationFetching, stationAll])

  // React.useEffect(() => {
  //   console.log(stationByBikeType)
  // }, [stationByBikeType])

  return (
    <div className="station-map-container">
      <MapContainer className="osm" center={CENTER_OF_TAIWAN} zoom={zoomLevel} minZoom={8} maxZoom={18}>
        <TileLayer url={OSM_CONFIG.url} attribution={OSM_CONFIG.attribution} />
        <FullscreenControl />

        <MarkerClusterGroup showCoverageOnHover={false}>
          {stationAll?.map(station => {
            return <StationMarker key={station.station_no} position={[+station.lat, +station.lng]} station={station} />
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default OpenStreetMap

function GetIcon(_iconUrl) {
  return L.icon({
    iconUrl: _iconUrl,
    iconSize: [30, 30],
  })
}

type StationMarkerProps = {
  position: LatLng
  station: CustomStation
}

const StationMarker = ({ station, position }: StationMarkerProps) => {
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      // setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return (
    <Marker position={position} icon={GetIcon(station.markerIcon)}>
      <InfoWindowPopup station={station} />
      {/* <Tooltip>
        <span>
          {station.name_tw}
          {`(${station.address_tw})`}
        </span>
      </Tooltip> */}
    </Marker>
  )
}

type InfoWindowPopupProps = {
  station: CustomStation
}

const styleContainer = {
  width: '245px',
  margin: 0,
  overflow: 'hidden',
  textAlign: 'left',
  fontSize: '9em',
  lineHeight: '24px',
  color: '#7F7F7F',
}

const InfoWindowPopup = ({ station }: InfoWindowPopupProps) => {
  return (
    <Popup className="popupCustom">
      <p>租賃站點查詢 :{station?.name_tw || ''}</p>
      <p>站點位置 : {station?.address_tw || ''}</p>
    </Popup>
  )
}
