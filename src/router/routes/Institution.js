import { lazy } from 'react'
import Url from '../../constants/Url'

const InstitutionRoutes = [
  {
    path: Url.institution,
    component: lazy(() => import('../../views/apps/user/instituciones/list')),
    exact: true,
  },
  {
    path: Url.institutionCreate,
    component: lazy(() => import('../../views/apps/user/instituciones/create')),
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

export default InstitutionRoutes
