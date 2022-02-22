import { useCallback, useEffect, useMemo, useState } from 'react'

import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import { MapContainer, TileLayer } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

const center = [51.505, -0.09]
const zoom = 13

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
    </p>
  )
}

function ExternalStateExample() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer center={center} zoom={zoom} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FullscreenControl />
      </MapContainer>
    ),
    []
  )

  return (
    <>
      <GoToSiteMap />
      <h1>Official example: External state</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
          </div>
        </div>
      </Container>
    </>
  )
}

export default ExternalStateExample
