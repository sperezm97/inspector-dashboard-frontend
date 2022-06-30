import Avatar from '@components/avatar'
import { Card, CardBody, Progress, Badge, Col } from 'reactstrap'
import profileImg from '@src/assets/images/icons/1.png'
import profileImgPerson from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { statusPriority, statusTickets } from '../../../../@core/components/status'
import { formatDate } from '../../../../utility/Utils'

const CardProfile = function ({ dataTicket, zonesState }) {

return <Card>
    <CardBody>
      <h2 className="mb-0">
        {dataTicket?.attributes?.institution?.data?.attributes?.acronym} - {dataTicket?.attributes?.institution?.data?.attributes?.name}
      </h2>

      <hr className="mb-2" />
      <div className="text-left">
        <span className="mr-2">
          {statusTickets(dataTicket?.attributes?.state)}
        </span>
        <span className="mr-2">
          {statusPriority(dataTicket?.attributes?.priority)}
        </span>
        <span className="mr-2">
          <Badge className="profile-badge" color="light-primary">
            {formatDate(dataTicket?.attributes?.createdAt)}
          </Badge>
        </span>
        <div className="mt-1">
          <h3>{dataTicket?.attributes?.title}</h3>

          <small tag="span" className="font-weight-bolder">
            {dataTicket?.attributes?.address}
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

      {dataTicket?.attributes?.services?.data[0] &&
        <>
          <hr />
          {dataTicket?.attributes?.services?.data.map((tags, index) => (
            <Badge key={index} style={{ margin: '5px' }} color='light-secondary'>
              {tags.attributes.name}
            </Badge>
          ))}
        </>
      }

      <hr />

      <h4 className="mb-0 text-left">
        {dataTicket?.attributes?.owner?.data?.attributes?.firstname} {dataTicket?.attributes?.owner?.data?.attributes?.lastname}
      </h4>

      <div className='mb-1'>
        <span className="">
          <Badge className="profile-badge" color="light-primary">
            {dataTicket?.attributes?.owner?.data?.attributes?.cedula}
          </Badge>
        </span>

      </div>

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
