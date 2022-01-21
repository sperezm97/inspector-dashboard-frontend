export const zammadApi = {
  tickets: 'tickets',
  ticketById: (id) => `tickets/${id}?expand=true`,
  allTickets: 'ticket_overviews?view=all',
  ticketsByDate: 'tickets/search?query=created_at:',
  ticketsByState: 'tickets/search?query=state_id:',
  ticketsByGroup: 'tickets/search?query=group_id:',

  ticketArticles: 'ticket_articles/by_ticket/',
  postTicketArticles: 'ticket_articles',

  users: 'users',
  userMe: 'users/me?expand=true',
  userById: (id) => `users/${id}?expand=true`,
  userByCedula: 'users/search?query=cedula:',
  allUsers: 'users?expand=true',

  allRols: 'roles',

  organizations: 'organizations',

  groups: 'groups',
}
