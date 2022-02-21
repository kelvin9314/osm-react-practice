import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import { Circle, FeatureGroup, LayerGroup, MapContainer, Popup, Rectangle, TileLayer } from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const fillRedOptions = { fillColor: 'red' }
const greenOptions = { color: 'green', fillColor: 'green' }
const purpleOptions = { color: 'purple' }

function OtherLayersExample() {
  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Other layers</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <MapContainer center={center} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FullscreenControl />
              <LayerGroup>
                <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
                <Circle center={center} pathOptions={fillRedOptions} radius={100} stroke={false} />
                <LayerGroup>
                  <Circle center={[51.51, -0.08]} pathOptions={greenOptions} radius={100} />
                </LayerGroup>
              </LayerGroup>
              <FeatureGroup pathOptions={purpleOptions}>
                <Popup>Popup in FeatureGroup</Popup>
                <Circle center={[51.51, -0.06]} radius={200} />
                <Rectangle bounds={rectangle} />
              </FeatureGroup>
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default OtherLayersExample
