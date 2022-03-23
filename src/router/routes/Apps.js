import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Url from '../../constants/Url'

const AppRoutes = [
  {
    path: Url.dashboardInbox,
    exact: true,
    component: lazy(() => import('../../views/apps/bandeja/list')),
  },
  {
    path: Url.dashboardInboxCreate,
    exact: true,
    component: lazy(() => import('../../views/apps/report/create')),
    meta: {
      navLink: Url.dashboardInbox,
    },
  },
  {
    path: Url.reportCreate,
    exact: true,
    component: lazy(() => import('../../views/apps/report/create')),
  },
  {
    path: Url.reportImport,
    exact: true,
    component: lazy(() => import('../../views/apps/report/import')),
  },
  {
    path: Url.user,
    component: lazy(() => import('../../views/apps/user/list')),
    exact: true,
  },
  {
    path: Url.userCreate,
    component: lazy(() => import('../../views/apps/user/create')),
    exact: true,
  },
  {
    path: Url.userImport,
    component: lazy(() => import('../../views/apps/user/import')),
    exact: true,
  },
  {
    path: Url.userReporter,
    component: lazy(() => import('../../views/apps/user/reportero')),
  },
  {
    path: Url.userOfficial,
    component: lazy(() => import('../../views/apps/user/oficiales')),
  },
  {
    path: Url.userRegional,
    component: lazy(() => import('../../views/apps/user/regional')),
  },
  {
    path: Url.userProvincial,
    component: lazy(() => import('../../views/apps/user/provincial')),
  },
  {
    path: Url.userMunicipal,
    component: lazy(() => import('../../views/apps/user/municipal')),
  },
  {
    path: Url.userMunicipalDistrict,
    component: lazy(() => import('../../views/apps/user/distritoMunicipal')),
  },
  {
    path: Url.userZonal,
    component: lazy(() => import('../../views/apps/user/zonales')),
  },
  {
    path: `${Url.userEdit}/:id`,
    component: lazy(() => import('../../views/apps/user/edit')),
    exact: true,
    meta: {
      navLink: Url.user,
    },
  },
  {
    path: `${Url.dashboardInbox}/:id`,
    exact: true,
    component: lazy(() => import('../../views/apps/bandeja/details')),
    meta: {
      navLink: Url.dashboardInbox,
    },
  },
]

export default AppRoutes
