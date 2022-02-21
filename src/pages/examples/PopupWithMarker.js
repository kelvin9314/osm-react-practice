import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

// const position = [51.505, -0.09]
const position = { lat: 51.505, lng: -0.09 }

function PopupExample() {
  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Popup with Marker</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <MapContainer center={position} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FullscreenControl />

              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default PopupExample
