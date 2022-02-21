import OpenStreetMap from '@/components/OpenStreetMap'
import GoToSiteMap from '@/components/GoToSiteMap'

// ---MUI
import Container from '@mui/material/Container'

const OsmYouBike = () => {
  return (
    <>
      <GoToSiteMap />
      <Container maxWidth="xl">
        <div className="page-container">
          <OpenStreetMap />
        </div>
      </Container>
    </>
  )
}

export default OsmYouBike
