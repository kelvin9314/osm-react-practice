import { Navigate, useRoutes } from 'react-router-dom'

import OsmYouBike from '@/pages/OsmYouBike'
import SiteMap from '@/pages/Sitemap'

import PopupWithMarker from '@/pages/examples/PopupWithMarker'
import Events from '@/pages/examples/Events'
import VectorLayers from '@/pages/examples/VectorLayers'
import SvgOverlay from '@/pages/examples/SvgOverlay'
import OtherLayers from '@/pages/examples/OtherLayers'
import Tooltips from '@/pages/examples/Tooltips'
import LayersControl from '@/pages/examples/LayersControl'
import Panes from '@/pages/examples/Panes'
import DraggableMarker from '@/pages/examples/DraggableMarker'
import ViewBounds from '@/pages/examples/ViewBounds'
import AnimatedPanning from '@/pages/examples/AnimatedPanning'
import ReactControl from '@/pages/examples/ReactControl'
import ExternalState from '@/pages/examples/ExternalState'
import MapPlaceholder from '@/pages/examples/MapPlaceholder'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = [
    {
      path: '/',
      // element: ,
      children: [
        { path: '/youbike', element: <OsmYouBike /> },
        { path: '/', element: <Navigate to="/youbike" /> },
        { path: '/sitemap', element: <SiteMap /> },
        { path: '*', element: <Navigate to="/youbike" /> },
      ],
    },
    {
      path: '/examples',
      // element: ,
      children: [
        { path: 'popup-with-marker', element: <PopupWithMarker /> },
        { path: 'events', element: <Events /> },
        { path: 'vector-layers', element: <VectorLayers /> },
        { path: 'svg-overlay', element: <SvgOverlay /> },
        { path: 'other-layers', element: <OtherLayers /> },
        { path: 'tooltips', element: <Tooltips /> },
        { path: 'layers-control', element: <LayersControl /> },
        { path: 'panes', element: <Panes /> },
        { path: 'draggable-marker', element: <DraggableMarker /> },
        { path: 'view-bounds', element: <ViewBounds /> },
        { path: 'animated-panning', element: <AnimatedPanning /> },
        { path: 'react-control', element: <ReactControl /> },
        { path: 'external-state', element: <ExternalState /> },
        { path: 'map-placeholder', element: <MapPlaceholder /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]

  return useRoutes(routes)
}
