import { Card, CardBody, CardText } from 'reactstrap'
import CardHeader from 'reactstrap/lib/CardHeader'
import { User, Phone } from 'react-feather'

const CardProfile = function({dataTicket}) {
  return <Card className="card-profile">
    <CardHeader>
      <div className="text-left">
        <h3>Datos del ciudadano</h3>
        <h6 className="text-muted text-capitalize">
          {dataTicket?.attributes?.beneficiary?.data?.attributes?.name}
        </h6>
        <small>
          {dataTicket?.attributes?.beneficiary?.data?.attributes?.email}
        </small>
      </div>
      <hr className="mt-0" />
      <div className="d-flex justify-content-between align-items-center">
        <div className="user-info-wrapper">
          <div className="d-flex flex-wrap align-items-center">
            <div className="user-info-title">
              <User className="mr-1" size={14} />
              <CardText
                tag="span"
                className="user-info-title font-weight-bold mb-0 mr-1"
              >
                Cédula
              </CardText>
            </div>
            <CardText className="text-capitalize text-right mb-0 ml-5 mr-1">
              {dataTicket?.attributes?.beneficiary?.data?.attributes?.cedula}
            </CardText>
          </div>
          <div className="d-flex flex-wrap align-items-center my-50">
            <div className="user-info-title">
              <Phone className="mr-1" size={14} />
              <CardText
                tag="span"
                className="user-info-title font-weight-bold mb-0"
              >
                Contacto
              </CardText>
            </div>
            <CardText className="text-capitalize mb-0 ml-5">
              {dataTicket?.attributes?.beneficiary?.data?.attributes?.phone}
            </CardText>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
}

export default CardProfile
