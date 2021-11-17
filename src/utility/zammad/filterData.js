export const ticketNewObjectFiltered = (tickets = [], objs = []) => {
  let data = Object.values(tickets) || []

  data = data
    ? data.map((ticket) => ({
        id: ticket.id,
        idTicket: ticket.number,
        title: ticket.title,
        status: objs?.TicketState[ticket.state_id]?.name,
        address: ticket.address,
        createDate: ticket.created_at,

        ownerId: objs?.User[ticket.owner_id]?.id,
        ownerFirstName: objs?.User[ticket.owner_id]?.firstname,
        ownerLastName: objs?.User[ticket.owner_id]?.lastname,
        ownerCedula: objs?.User[ticket.owner_id]?.cedula,

        customerId: objs?.User[ticket.customer_id]?.id,
        customerFirstName: objs?.User[ticket.customer_id]?.firstname,
        customerLastName: objs?.User[ticket.customer_id]?.lastname,
        customerCedula: objs?.User[ticket.customer_id]?.cedula,

        institutionId: objs?.Organization[ticket.organization_id]?.id,
        institutionName: objs?.Organization[ticket.organization_id]?.name,
        institutionAcronym:
          objs?.Organization[ticket.organization_id]?.acronimo,
        priority: ticket.priority_id,
        zone: ticket.zone || '',
      }))
    : []

  return data
}
