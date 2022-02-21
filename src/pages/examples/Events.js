import { useState } from 'react'

import GoToSiteMap from '@/components/GoToSiteMap'

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import Container from '@mui/material/Container'
import { FullscreenControl } from 'react-leaflet-fullscreen'

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function EventsExample() {
  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Events</h1>

      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FullscreenControl />
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default EventsExample
