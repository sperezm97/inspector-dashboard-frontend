// ** Navigation sections imports
import apps from './apps'
import dashboards from './dashboards'
import institution from './institution'
import tickets from './tickets'

// ** Merge & Export
export default [
    ...dashboards, 
    ...tickets,
    ...apps, 
    ...institution, 
]
