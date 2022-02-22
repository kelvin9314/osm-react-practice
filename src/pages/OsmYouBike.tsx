import React from 'react'

import YouBike from '@/components/YouBike'
import GoToSiteMap from '@/components/GoToSiteMap'

// ---MUI
import Container from '@mui/material/Container'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

type BikeType = 1 | 2

const OsmYouBike = () => {
  const [selectedBikeType, setSelectedBikeType] = React.useState<BikeType>(1)

  // React.useEffect(() => {
  //   console.log(`selectedBikeType: ${selectedBikeType}`)
  // }, [selectedBikeType])

  return (
    <>
      <GoToSiteMap />
      <Container maxWidth="xl">
        <div className="page-container">
          <div>
            <FormControl>
              <FormLabel id="row-radio-buttons-group-label">Bike Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedBikeType}
                onChange={(event, val) => {
                  const type = Number(val) as BikeType
                  setSelectedBikeType(prev => type)
                }}
              >
                <FormControlLabel value={1} control={<Radio />} label="YouBike 1.0" />
                <FormControlLabel value={2} control={<Radio />} label="YouBike 2.0" />
              </RadioGroup>
            </FormControl>
          </div>
          <YouBike displayBikeType={selectedBikeType} />
        </div>
      </Container>
    </>
  )
}

export default OsmYouBike
