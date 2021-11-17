export const zammadApi = {
  allTickets: 'ticket_overviews?view=all_open',
  ticketsByDate: 'tickets/search?query=created_at:',
  ticketsByState: 'tickets/search?query=state_id:',
  ticketsByGroup: 'tickets/search?query=group_id:',

  allUsers: 'users?expand=true',

  allRols: 'roles',

  allOrganizations: 'organizations',
}
