import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import { MapContainer, TileLayer } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

function MapPlaceholder() {
  return (
    <p>
      Map of London. <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

function MapWithPlaceholder() {
  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Map placeholder</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <MapContainer center={[51.505, -0.09]} zoom={13} placeholder={<MapPlaceholder />}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FullscreenControl />
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default MapWithPlaceholder
