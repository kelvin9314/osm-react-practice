import GoToSiteMap from '@/components/GoToSiteMap'

import Container from '@mui/material/Container'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'

const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

function LayersControlExample() {
  return (
    <>
      <GoToSiteMap />
      <h1>Official example: Layers control</h1>
      <Container maxWidth="xl">
        <div className="page-container">
          <div className="station-map-container">
            <MapContainer center={center} zoom={13}>
              <FullscreenControl />

              <LayersControl position="topright" collapsed={false}>
                <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay name="Marker with popup">
                  <Marker position={center}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Layer group with circles">
                  <LayerGroup>
                    <Circle center={center} pathOptions={{ fillColor: 'blue' }} radius={200} />
                    <Circle center={center} pathOptions={{ fillColor: 'red' }} radius={100} stroke={false} />
                    <LayerGroup>
                      <Circle
                        center={[51.51, -0.08]}
                        pathOptions={{ color: 'green', fillColor: 'green' }}
                        radius={100}
                      />
                    </LayerGroup>
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Feature group">
                  <FeatureGroup pathOptions={{ color: 'purple' }}>
                    <Popup>Popup in FeatureGroup</Popup>
                    <Circle center={[51.51, -0.06]} radius={200} />
                    <Rectangle bounds={rectangle} />
                  </FeatureGroup>
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          </div>
        </div>
      </Container>
    </>
  )
}

export default LayersControlExample
