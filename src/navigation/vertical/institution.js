import { Circle } from 'react-feather'
import { IconInstitutionNav } from '../../@core/components/icons'
import Url from '../../constants/Url'

export default [
  {
    id: 'institution',
    title: 'Institución',
    icon: <IconInstitutionNav size={20} />,
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
