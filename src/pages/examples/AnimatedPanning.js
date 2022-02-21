import { useRef } from 'react'

import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', e => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

function AnimateExample() {
  const animateRef = useRef(false)

  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Animated panning</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <p>
              <label>
                <input
                  type="checkbox"
                  onChange={() => {
                    animateRef.current = !animateRef.current
                  }}
                />
                Animate panning
              </label>
            </p>
            <MapContainer center={[51.505, -0.09]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FullscreenControl />
              <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AnimateExample
