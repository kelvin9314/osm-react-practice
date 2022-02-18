import React from 'react'
import * as R from 'ramda'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

import { areaConfig, zoomLevelConfig, CENTER_OF_TAIWAN } from '@/utils/constant'
import useStations from '@/hooks/useStations'

const TAICHUNG_LAT_LNG: [number, number] = [24.154712, 120.664265]

const OSM_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
}

const OpenStreetMap = () => {
  const { data: rawStations, isError, isLoading } = useStations()

  React.useEffect(() => {
    console.log(rawStations)
  }, [rawStations])

  const selectedBikeType = React.useMemo(() => {
    const params = new URLSearchParams(location.search)
    const val = params.get('bike_type')
    if (['1', '2'].includes(val)) return val

    // NOTE : 預設是 1.0
    return '1'
  }, [location.search])

  // const { stationAll, stationByBikeType } = React.useMemo(() => {
  //   const yb1 = rawStations.yb1 ? R.clone(rawStations.yb1) : []
  //   const yb2 = rawStations.yb2 ? R.clone(rawStations.yb2) : []

  //   const processingData = s => {
  //     const area = R.values(areaConfig).find(area => area.areaCode === s.area_code)
  //     return {
  //       ...s,
  //       markerIcon: getStationMarkerIcon(s),
  //       areaName: area.name,
  //     }
  //   }
  //   const stationAll = R.map(processingData, R.concat(yb1, yb2))
  //   const stationByBikeType = R.map(processingData, selectedBikeType === '1' ? yb1 : yb2)

  //   return { stationAll, stationByBikeType }
  // }, [rawStations, selectedBikeType])

  return (
    <div className="station-map-container">
      <MapContainer className="osm" center={CENTER_OF_TAIWAN} zoom={8} maxZoom={8}>
        <TileLayer url={OSM_CONFIG.url} attribution={OSM_CONFIG.attribution} />
        {/* <Marker position={areaConfig.taichung.position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable. Easily customizable.Easily customizable.Easily
            customizable.Easily customizable.Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  )
}

export default OpenStreetMap
