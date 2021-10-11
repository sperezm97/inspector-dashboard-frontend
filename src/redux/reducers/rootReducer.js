// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
// import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'
import layout from './layout'
import navbar from './navbar'
import auth from './auth'

import tickets from './zammad/tickets'
import users from './zammad/users'
import rols from './zammad/rols'

import regions from './territories/regions'
import provinces from './territories/provinces'
import municipalities from './territories/municipalities'

const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  // users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,

  tickets,
  users,
  rols,

  regions,
  provinces,
  municipalities,
})

export default rootReducer
