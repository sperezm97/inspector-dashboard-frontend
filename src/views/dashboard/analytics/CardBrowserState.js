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

const CardBrowserState = ({ organizations, listTickets }) => {
  const renderStates = () =>
    organizations.map((state) => {
      const ticketLength =
        listTickets.filter((ticket) => ticket.organization_id === state.id)
          .length || 0

      return (
        <div key={state.id} className="browser-states">
          <div className="flex-grow-1">
            <Media>
              <img
                className="rounded mr-1"
                src={require('@src/assets/images/icons/1.png').default}
                height="30"
                alt={state.acronimo}
              />
              <h6 className="align-self-center mb-0">
                {state.acronimo} - {state.name}
              </h6>
            </Media>
          </div>
          <div>
            <div className="font-weight-bold text-body-heading mx-1">
              {ticketLength}
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
        <div>
          <p className="text-muted">Últimos 28 días</p>
        </div>
        {/* <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle
            color=""
            className="bg-transparent btn-sm border-0 p-50"
          >
            <MoreVertical size={18} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className="w-100">Last 28 Days</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        <div className="overflow-auto" style={{ height: '300px' }}>
          {renderStates()}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardBrowserState
