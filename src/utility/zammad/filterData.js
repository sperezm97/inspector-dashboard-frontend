export const ticketNewObjectFiltered = (tickets = [], objs = []) => {

  let data = []

  data = tickets ? tickets.map(ticket => {
    return {
      id: ticket.id,
      idTicket: ticket.number,
      title: ticket.title,
      status: objs?.TicketState[ticket.state_id].name,
      address: ticket.address,
      createDate: ticket.created_at,
      reporterId: objs?.User[ticket.customer_id]?.id,
      reporterFirstName: objs?.User[ticket.customer_id]?.firstname,
      reporterLastName: objs?.User[ticket.customer_id]?.lastname,
      reporterCedula: objs?.User[ticket.customer_id]?.cedula,
      institutionId: objs?.Organization[ticket.organization_id]?.id,
      institutionName: objs?.Organization[ticket.organization_id]?.name,
      institutionAcronym: objs?.Organization[ticket.organization_id]?.acronimo,
      priority: ticket.priority_id,
      zone: ticket.zone,
    }
  }) : []

  return data
}