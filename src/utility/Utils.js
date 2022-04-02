import moment from 'moment'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '')

export const dateToday = (f) => moment().format(f || 'DD/MM/YYYY')
export const dateBeforeDay = ({ day = 1, dayMonthsAgo = 'days', f }) =>
  moment()
    .subtract(day, dayMonthsAgo)
    .format(f || 'DD/MM/YYYY')

export const toMs = (dateStr) => {
  const parts = dateStr.split('/')
  return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
}

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { day: 'numeric', month: 'numeric', year: 'numeric' },
) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-GB', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#0443861a', // for option hover bg-color
    primary: '#044386', // for selected option bg-color
    neutral10: '#044386', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed', // for input hover border-color
  },
})

export const optionsCodeValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.code,
        label: dataMap.name,
      }))
    : []

  return data
}

export const optionsCodeValueSelectNoData = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.code,
        label: dataMap.name,
      }))
    : []

  return [{ value: '', label: 'Sin Seleccionar' }, ...data]
}

export const optionsIdValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.id,
        label: dataMap.name,
      }))
    : []

  return data
}

export const optionsIdValueSelectNoData = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.id,
        label: dataMap.name,
      }))
    : []

  return [{ value: '', label: 'Sin Seleccionar' }, ...data]
}

export const optionsNoteValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.id,
        label: dataMap.note,
      }))
    : []

  return [{ value: '', label: 'Sin Seleccionar' }, ...data]
}

export const optionsZammadIdValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.id,
        label: dataMap.name,
      }))
    : []

  return data
}

export const optionsIdentifierValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.identifier,
        label: dataMap.name,
      }))
    : []

  return [{ value: '', label: 'Sin Seleccionar' }, ...data]
}

export const optionsIncidentsZammadIdValueSelect = (dataSelect = null) => {
  const data = dataSelect
    ? dataSelect.map((dataMap) => ({
        value: dataMap.zammadId,
        label: dataMap.name,
      }))
    : []

  return data
}

export const noOptionsMessageSelect = (inputValue, label) =>
  !inputValue && label

export const filterByStatusTickets = (tickets = [], label = '') =>
  tickets.filter((ticket) => ticket.status === label)

export const filterByPriorityTickets = (tickets = [], label = '') =>
  tickets.filter((ticket) => ticket.priority === label)

export const addAllGroupsToUser = (groupsState) => {
  let newGroup = {}
      
  groupsState.map((group) => newGroup = {...newGroup, [group.id] : ["full"]} )

  return newGroup
}

export const destructZone = (zoneId) => {
  let zone = {}

  if(zoneId.length >= 2) {
    zone = {...zone, region: zoneId.substr(0, 2)}
  }
  if(zoneId.length >= 4) {
    zone = {...zone, province: zoneId.substr(0, 4)}
  }
  if(zoneId.length >= 6) {
    zone = {...zone, municipality: zoneId.substr(0, 6)}
  }
  if(zoneId.length >= 8) {
    zone = {...zone, district: zoneId.substr(0, 8)}
  }
  if(zoneId.length >= 10) {
    zone = {...zone, section: zoneId.substr(0, 10)}
  }
  if(zoneId.length >= 13) {
    zone = {...zone, neighborhood: zoneId.substr(0, 13)}
  }
  if(zoneId.length >= 15) {
    zone = {...zone, subNeighborhood: zoneId.substr(0, 15)}
  }

  return zone
}

export const downloadCSV = (dataTable) => {

  const convertArrayOfObjectsToCSV = (array) => {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(dataTable[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
        let ctr = 0
        keys.forEach((key) => {
            if (ctr > 0) result += columnDelimiter
    
            result += item[key]
    
            ctr++

        })
        result += lineDelimiter
    })

    return result
  }

  if(dataTable === []) return
        
  const link = document.createElement('a')
  let csv = convertArrayOfObjectsToCSV(dataTable)
  if (csv === null) return

  const filename = 'export.csv'

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`
  }

  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', filename)
  link.click()
}
