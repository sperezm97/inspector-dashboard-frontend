import { MoreVertical } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import LoadingData from '../../../@core/components/spinner/loadingData'

const CardBrowserState = function({ organizations, listTickets }) {
  const renderStates = () =>
    organizations.map((state) => {
      const ticketLength =
        listTickets.filter((ticket) => ticket.institutionId === state.id)
          .length || 0

      return (
        <div key={state.id} className="browser-states">
          <div className="flex-grow-1">
            <Media>
              {/* <img
                className="rounded mr-1"
                src={require('@src/assets/images/icons/1.png').default}
                height="30"
                alt={state.acronimo}
              /> */}
              <h6 className="align-self-center text-primary mb-0">
                {state.acronimo}
              </h6>
            </Media>
            <small>{state.name}</small>
          </div>
          <div>
            <div className="font-weight-bold text-body-heading mx-1">
              {!listTickets[0] ? <LoadingData size='sm' /> : ticketLength}
            </div>
          </div>
        </div>
      )
    })

  return (
    <Card className="card-browser-states">
      <CardHeader className="pb-0">
        <div className="flex-grow-1">
          <CardTitle tag="h4" className="mb-1">
            Instituciones
          </CardTitle>
        </div>
        <div>{/* <p className="text-muted">Últimos 28 días</p> */}</div>
      </CardHeader>
      <CardBody>
        <div className="overflow-auto" style={{ height: '310px' }}>
          {renderStates()}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardBrowserState
