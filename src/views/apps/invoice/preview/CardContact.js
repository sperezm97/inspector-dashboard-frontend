import { Card, CardBody, CardText } from 'reactstrap'
import CardHeader from 'reactstrap/lib/CardHeader'
import { User, Phone } from 'react-feather'

const CardProfile = () => (
  <Card className="card-profile">
    <CardHeader>
      <div className="text-left">
        <h3>Datos del ciudadano</h3>
        <h6 className="text-muted text-capitalize">TEST 02</h6>
      </div>
    </CardHeader>
    <CardBody>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <div className="user-info-wrapper">
          <div className="d-flex flex-wrap align-items-center my-50">
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
              000000000
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
              (829)555-8596
            </CardText>
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
)

export default CardProfile
