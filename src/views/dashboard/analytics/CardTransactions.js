import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

const CardTransactions = ({ provinces, listTickets }) => {
  const renderTransactions = () =>
    provinces.map((state) => {
      const ticketLength =
        listTickets.filter(
          (ticket) => ticket.zone.substr(0, 4) === state.identifier,
        ).length || 0

      const stateNum = Math.floor(Math.random() * 6)
      const states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary',
      ]
      const color = states[stateNum]

      return (
        <div key={state.identifier} className="transaction-item">
          <Media>
            <Avatar
              color={color || 'primary'}
              className="mr-1"
              content={state.name ? state.name : 'X'}
              initials
            />
            <h6 className="align-self-center mb-0">{state.name}</h6>
            {/* <small>{item.subtitle}</small> */}
          </Media>
          <div className="font-weight-bold text-body-heading mx-1">
            {ticketLength}
          </div>
        </div>
      )
    })

  return (
    <Card className="card-transaction">
      <CardHeader className="pb-0">
        <div className="flex-grow-1">
          <CardTitle tag="h4" className="mb-1">
            Provincias
          </CardTitle>
        </div>
        <div>
          {/* <p className="text-muted">Últimos 28 días</p> */}
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-auto" style={{ height: '350px' }}>
          {renderTransactions()}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardTransactions
