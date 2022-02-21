import { Navigate, useRoutes } from 'react-router-dom'

import OsmYouBike from '@/pages/OsmYouBike'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = [
    {
      path: '/',
      // element: ,
      children: [
        { path: '/youbike', element: <OsmYouBike /> },
        { path: '/', element: <Navigate to="/youbike" /> },
        { path: '*', element: <Navigate to="/youbike" /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]

  return useRoutes(routes)
}
