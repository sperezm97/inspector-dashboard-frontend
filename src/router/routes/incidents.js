import { lazy } from 'react'
import Url from '../../constants/Url'

const IncidentsRoutes = [
  {
    path: Url.services,
    component: lazy(() => import('../../views/incidents/services/list')),
    exact: true,
  },
  {
    path: Url.servicesCreate,
    component: lazy(() => import('../../views/incidents/services/create')),
    exact: true,
    meta: {
      navLink: Url.services,
    },
  },

  {
    path: Url.category,
    component: lazy(() => import('../../views/incidents/category/list')),
    exact: true,
  },
  {
    path: Url.categoryCreate,
    component: lazy(() => import('../../views/incidents/category/create')),
    exact: true,
    meta: {
      navLink: Url.services,
    },
  },

  {
    path: Url.subCategory,
    component: lazy(() => import('../../views/incidents/subCategory/list')),
    exact: true,
  },
  {
    path: Url.subCategoryCreate,
    component: lazy(() => import('../../views/incidents/subCategory/create')),
    exact: true,
    meta: {
      navLink: Url.services,
    },
  },
]

export default IncidentsRoutes
