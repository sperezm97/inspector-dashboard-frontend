import { useSelector } from 'react-redux'

export const getStateById = (id) => {

  const stateId = useSelector(state => state?.tickets?.tickets[0].TicketState)

  return stateId[id].name
}

export const getCustomerById = (id) => {

    const stateId = useSelector(state => state?.tickets?.tickets[0].User)
  
    return stateId[id]
}

export const getOrganizationById = (id) => {

    const stateId = useSelector(state => state?.tickets?.tickets[0].Organization)
  
    return stateId[id] 
}