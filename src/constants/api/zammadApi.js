export const zammadApi = {
  tickets: 'tickets',
  ticketById: (id) => `tickets/${id}?expand=true`,
  allTickets: 'ticket_overviews?view=all',
  ticketsByDate: 'tickets/search?query=created_at:',
  ticketsByState: 'tickets/search?query=state_id:',
  ticketsByGroup: 'tickets/search?query=group_id:',

  ticketPriorities: 'ticket_priorities',
  
  ticketStates: 'ticket_states',
  
  postTags: 'tag_list',
  tagsByName: (name) => `tag_search?term=${name}`,
  
  postTicketTags: 'tags/add',
  ticketTags: (id) => `tags?object=Ticket&o_id=${id}`,

  ticketArticles: 'ticket_articles/by_ticket/',
  postTicketArticles: 'ticket_articles',
  ticketArticlesAttachment: 'ticket_attachment/',

  users: 'users',
  userMe: 'users/me?expand=true',
  userById: (id) => `users/${id}?expand=true`,
  userByCedula: 'users/search?query=cedula:',
  allUsers: 'users?expand=true',

  allRols: 'roles',

  organizations: 'organizations',
  organizationsByAcronym: (acronym) => `organizations/search?query=acronimo:${acronym}`,

  groups: 'groups',
}
