import React from 'react'
import './App.css'

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
