import Avatar from '@components/avatar'
import { Card, CardBody, Progress, Badge, Col } from 'reactstrap'
import profileImg from '@src/assets/images/icons/1.png'
import profileImgPerson from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { statusPriority, statusTickets } from '../../../../@core/components/status'
import { formatDate } from '../../../../utility/Utils'

const CardProfile = function({dataTicket, dataUserOwner}) {
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
        </div>
      </div>

      <hr className="mb-2" />
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
