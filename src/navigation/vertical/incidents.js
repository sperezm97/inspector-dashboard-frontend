import { Layers, Circle } from 'react-feather'
import Url from '../../constants/Url'

export default [
  {
    id: 'incidents',
    title: 'Incidencias',
    icon: <Layers size={20} />,
    children: [
      {
        id: 'incidents',
        title: 'Servicios',
        icon: <Circle size={12} />,
        navLink: Url.services,
      },
      {
        id: 'incidents',
        title: 'Categorias',
        icon: <Circle size={12} />,
        navLink: Url.category,
      },
      {
        id: 'incidents',
        title: 'Sub-Categorias',
        icon: <Circle size={12} />,
        navLink: Url.subCategory,
      },
    ],
  },
]
