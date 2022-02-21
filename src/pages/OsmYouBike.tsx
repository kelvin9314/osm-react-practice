import OpenStreetMap from '@/components/OpenStreetMap'

// ---MUI
import Container from '@mui/material/Container'

const OsmYouBike = () => {
  return (
    <Container maxWidth="xl">
      <div className="page-container">
        <OpenStreetMap />
      </div>
    </Container>
  )
}

export default OsmYouBike
