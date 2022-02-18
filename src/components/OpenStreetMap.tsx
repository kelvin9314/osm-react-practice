import type { LatLng } from '@/utils/constant'

import React from 'react'
import * as R from 'ramda'
import useStations from '@/hooks/useStations'
import { areaConfig, zoomLevelConfig, CENTER_OF_TAIWAN } from '@/utils/constant'
import { searchStationByName, getStationMarkerIcon, filterIncorrectStation } from '@/utils/station-helpers'

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

const TAICHUNG_LAT_LNG: [number, number] = [24.154712, 120.664265]

const OSM_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
}

const OpenStreetMap = () => {
  const { data: rawStations, isError, isLoading } = useStations()

  const [selectedBikeType, setSelectedBikeType] = React.useState<'yb1' | 'yb2'>('yb1')

  const { stationAll, stationByBikeType } = React.useMemo(() => {
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

    return { stationAll, stationByBikeType }
  }, [rawStations, selectedBikeType])

  // React.useEffect(() => {
  //   console.log(stationAll)
  // }, [stationAll])

  React.useEffect(() => {
    console.log(stationByBikeType)
  }, [stationByBikeType])

  return (
    <div className="station-map-container">
      <MapContainer className="osm" center={CENTER_OF_TAIWAN} zoom={8} minZoom={8}>
        <TileLayer url={OSM_CONFIG.url} attribution={OSM_CONFIG.attribution} />
        <MarkerClusterGroup>
          {stationAll?.map(station => {
            const position: LatLng = [+station.lat, +station.lng]

            return (
              <Marker key={station.station_no} position={position}>
                <Popup>{station.name_tw}</Popup>
              </Marker>
            )
            // return <StationMarker key={station.station_no} position={[+station.lat, +station.lng]} station={station} />
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default OpenStreetMap

type StationMarkerProps = {
  position: LatLng
  station: {}
}

// const StationMarker = ({ station, position }) => {
//   const map = useMapEvents({
//     click() {
//       console.log('marker clicked')
//       map.locate()
//     },
//     locationfound(e) {
//       console.log(e)
//       // setPosition(e.latlng)
//       // map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return (
//     <Marker position={position}>
//       <Popup>{station.name_tw}</Popup>
//     </Marker>
//   )
// }
