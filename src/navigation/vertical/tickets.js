import { List, Circle } from 'react-feather'
import Url from '../../constants/Url'

export default [
  {
    id: 'tickets',
    title: 'Tickets',
    icon: <List size={20} />,
    children: [
      {
        id: 'ticket',
        title: 'Lista',
        icon: <Circle size={12} />,
        navLink: Url.dashboardInbox,
      },
      {
        id: 'ticket',
        title: 'Crear',
        icon: <Circle size={12} />,
        navLink: Url.dashboardInboxCreate,
      },
    ],
  },
]
