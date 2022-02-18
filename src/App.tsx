import React from 'react'
import './App.css'
import 'react-leaflet-fullscreen/dist/styles.css'

import OpenStreetMap from '@/components/OpenStreetMap'

// ---MUI
import Container from '@mui/material/Container'

function App() {
  return (
    <Container maxWidth="xl">
      <div className="page-container">
        <OpenStreetMap />
      </div>
    </Container>
  )
}

export default App
