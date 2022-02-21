import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

type ListItemLinkProps = {
  primary: string
  to: string
}

function ListItemLink(props: ListItemLinkProps) {
  const { primary, to } = props

  const CustomLink = props => <Link to={to} {...props} />

  return (
    <ListItem button component={CustomLink}>
      <ListItemText primary={primary} />
    </ListItem>
  )
}

const SiteMap = () => {
  return (
    <Container maxWidth="xl">
      <h1>SiteMap</h1>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav>
          <List>
            <ListItemLink to="/youbike" primary="YouBike Map" />

            <ListItemLink to="/examples/popup-with-marker" primary="Official example: Popup with Marker" />
            <ListItemLink to="/examples/events" primary="Official example: Events" />
            <ListItemLink to="/examples/vector-layers" primary="Official example: Vector layers" />
            <ListItemLink to="/examples/svg-overlay" primary="Official example: SVG Overlay" />
            <ListItemLink to="/examples/other-layers" primary="Official example: Other layers" />
            <ListItemLink to="/examples/tooltips" primary="Official example: Tooltips" />
            <ListItemLink to="/examples/layers-control" primary="Official example: Layers control" />
            <ListItemLink to="/examples/panes" primary="Official example: Panes" />
            <ListItemLink to="/examples/draggable-marker" primary="Official example: Draggable Marker" />
            <ListItemLink to="/examples/view-bounds" primary="Official example: View bounds" />
            <ListItemLink to="/examples/animated-panning" primary="Official example: Animated panning" />
            <ListItemLink to="/examples/react-control" primary="Official example: React control" />
            <ListItemLink to="/examples/external-state" primary="Official example: External state" />
            <ListItemLink
              to="/examples/map-placeholder"
              primary="Official example: Map placeholder
"
            />
          </List>
        </nav>
      </Box>
    </Container>
  )
}

export default SiteMap
