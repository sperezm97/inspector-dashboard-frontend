import { Circle } from 'react-feather'
import { IconInstitution } from '../../@core/components/icons'
import Url from '../../constants/Url'

export default [
  {
    id: 'institution',
    title: 'Institución',
    icon: <IconInstitution size={20} />,
    children: [
      {
        id: 'instituciones',
        title: 'Lista',
        icon: <Circle size={12} />,
        navLink: Url.institution,
      },
    ],
  },
]
