import Avatar from '@components/avatar'
import { Card, CardBody, Progress, Badge, Col } from 'reactstrap'
import profileImg from '@src/assets/images/icons/1.png'
import profileImgPerson from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { statusPriority, statusTickets } from '../../../../@core/components/status'
import { formatDate } from '../../../../utility/Utils'

const CardProfile = function({dataTicket, dataUserOwner, dataTicketTags, zonesState}) {
  return <Card>
    <CardBody>
      <h2 className="mb-0">{dataTicket.group}</h2>
      
      <hr className="mb-2" />
      <div className="text-left">
        <span className="mr-2">
          {statusTickets(dataTicket.state_id)}
        </span>
        <span className="mr-2">
          {statusPriority(dataTicket.priority_id)}
        </span>
        <span className="mr-2">
          <Badge className="profile-badge" color="light-primary">
            {formatDate(dataTicket.created_at)}
          </Badge>
        </span>
        <div className="mt-1">
          <h3>{dataTicket.title}</h3>
          
          <small tag="span" className="font-weight-bolder">
            {dataTicket.address}
          </small>

          <hr />

          {zonesState?.region && <p className="m-0"><small><span className="font-weight-bolder">Región:</span> {zonesState?.region}</small></p>}
          {zonesState?.province && <p className="m-0"><small><span className="font-weight-bolder">Provincia:</span> {zonesState?.province}</small></p>}
          {zonesState?.municipality && <p className="m-0"><small><span className="font-weight-bolder">Municipio:</span> {zonesState?.municipality}</small></p>}
          {zonesState?.district && <p className="m-0"><small><span className="font-weight-bolder">Distrito:</span> {zonesState?.district}</small></p>}
          {zonesState?.section && <p className="m-0"><small><span className="font-weight-bolder">Sección:</span> {zonesState?.section}</small></p>}
          {zonesState?.neighborhood && <p className="m-0"><small><span className="font-weight-bolder">Barrio:</span> {zonesState?.neighborhood}</small></p>}
          {zonesState?.subNeighborhood && <p className="m-0"><small><span className="font-weight-bolder">Sub-Barrio:</span> {zonesState?.subNeighborhood}</small></p>}
        </div>
      </div>

      {dataTicketTags[0] &&
        <>
          <hr />
          {dataTicketTags.map((tags, index) => (
            <Badge key={index} style={{margin: '5px'}} color='light-secondary'>
              {tags}
            </Badge>
          ))}
        </>
      }

      <hr />

      {dataUserOwner &&
        <h4 className="mb-0 text-left">{dataUserOwner.firstname} {dataUserOwner.lastname}</h4>
      }
      <small
        tag="span"
        className="text-left text-primary font-weight-bolder"
      >
        Oficial del Ministerio
      </small>
    </CardBody>
  </Card>
}

export default CardProfile
