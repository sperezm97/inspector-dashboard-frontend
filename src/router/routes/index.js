// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import InstitutionRoutes from './Institution'
import IncidentsRoutes from './incidents'

import Url from '../../constants/Url'

// ** Document title
const TemplateTitle = '%s - Reportero'

// ** Default Route
const DefaultRoute = Url.home

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes,
  ...InstitutionRoutes,
  ...IncidentsRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
