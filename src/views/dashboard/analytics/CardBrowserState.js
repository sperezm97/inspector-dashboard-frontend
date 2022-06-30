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

const CardBrowserState = function ({ institutionWithTickets, loadingTicket }) {

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
          {institutionWithTickets.map(data => (
            <div key={data.id} className="browser-states">
              <div className="flex-grow-1">
                <Media>
                  {/* <img
                className="rounded mr-1"
                src={require('@src/assets/images/icons/1.png').default}
                height="30"
                alt={state.acronimo}
              /> */}
                  <h6 className="align-self-center text-primary mb-0">
                    {data.attributes.acronym}
                  </h6>
                </Media>
                <small>{data.attributes.name}</small>
              </div>
              <div>
                <div className="font-weight-bold text-body-heading mx-1">
                  {data.attributes.tickets.data.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardBrowserState
