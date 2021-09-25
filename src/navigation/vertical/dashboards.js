import { Home, Circle } from 'react-feather'
import Url from '../../constants/Url'

export default [
  {
    id: 'dashboards',
    title: 'Dashboard',
    icon: <Home size={20} />,
    children: [
      {
        id: 'reports',
        title: 'Reportes',
        icon: <Circle size={12} />,
        navLink: Url.dashboardReport,
      },
      {
        id: 'bandeja',
        title: 'Bandeja',
        icon: <Circle size={12} />,
        navLink: Url.dashboardInbox,
      },
    ],
  },
]
