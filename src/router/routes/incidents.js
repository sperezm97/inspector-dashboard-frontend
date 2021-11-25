import { lazy } from 'react'
import Url from '../../constants/Url'

const IncidentsRoutes = [
  {
    path: Url.services,
    component: lazy(() => import('../../views/incidents/services')),
    exact: true,
  },
  {
    path: Url.category,
    component: lazy(() => import('../../views/incidents/category')),
    exact: true,
  },
  {
    path: Url.subCategory,
    component: lazy(() => import('../../views/incidents/subCategory')),
    exact: true,
  },
  {
    path: `${Url.institutionEdit}/:id`,
    component: lazy(() => import('../../views/apps/user/instituciones/edit')),
    exact: true,
    meta: {
      navLink: Url.institution,
    },
  },
  {
    path: `${Url.institution}/:id`,
    component: lazy(() =>
      import('../../views/apps/user/instituciones/details'),
    ),
    exact: true,
    meta: {
      navLink: Url.institution,
    },
  },
]

export default IncidentsRoutes
