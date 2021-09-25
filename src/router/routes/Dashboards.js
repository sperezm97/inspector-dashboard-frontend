import { lazy } from 'react'
import Url from '../../constants/Url'

const DashboardRoutes = [
  {
    path: Url.dashboardReport,
    component: lazy(() => import('../../views/dashboard/analytics')),
    exact: true,
  },
]

export default DashboardRoutes
