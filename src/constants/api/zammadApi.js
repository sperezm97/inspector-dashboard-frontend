export const zammadApi = {
  allTickets: 'ticket_overviews?view=all',
  ticketsByDate: 'tickets/search?query=created_at:',
  ticketsByState: 'tickets/search?query=state_id:',
  ticketsByGroup: 'tickets/search?query=group_id:',

  users: 'users',
  userMe: 'users/me?expand=true',

  allUsers: 'users?expand=true',

  allRols: 'roles',

  organizations: 'organizations',
}
