import Avatar from '@components/avatar'
import { Card, CardBody, Progress, Badge, Col } from 'reactstrap'
import profileImg from '@src/assets/images/icons/1.png'
import profileImgPerson from '@src/assets/images/portrait/small/avatar-s-9.jpg'

const CardProfile = () => (
  <Card className="card-profile">
    <CardBody>
      <Col
        xl="12"
        lg="12"
        className="d-flex flex-column justify-content-between border-container-lg"
      >
        <div className="user-avatar-section">
          <div className="d-flex justify-content-start">
            <div className="profile-image ml-3">
              <div className="profile-image">
                <img
                  src={profileImg}
                  className="img-fluid"
                  width="50px"
                  height="80px"
                />
              </div>
            </div>
            <div className="d-flex flex-column ml-1 text-left">
              <div className="user-info mb-1">
                <h4 className="mb-0">Ministerio de Obras Publicas</h4>
                <small tag="span">MOPC</small>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <hr className="mb-2" />
      <div className="text-left">
        <Badge className="profile-badge" color="light-success">
          Abierto
        </Badge>
        <Badge className="profile-badge ml-1 mr-1" color="light-warning">
          Prioridad Alta
        </Badge>
        <Badge className="profile-badge" color="light-primary">
          03, Sep,20
        </Badge>
        <div className="mb-3">
          <h3>Reparacion de Calle</h3>
          <small tag="span" className="font-weight-bolder">
            Luis F. Thomas #450, El Millon
          </small>
        </div>
        <small>Progreso</small>
        {/**
                 <Progress value='45' className='progress-bar-success mt-1'>
                    45%
                  </Progress>
                   */}
      </div>

      <hr className="mb-2" />
      <Col
        xl="12"
        lg="12"
        className="d-flex flex-column justify-content-between border-container-lg"
      >
        <div className="user-avatar-section">
          <div className="d-flex justify-content-start">
            <div className="profile-image ml-5">
              <div className="profile-image">
                <Avatar
                  img={profileImgPerson}
                  size="lg"
                  className="avatar-border box-shadow-1"
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="user-info mb-1">
                <h4 className="mb-0 ml-1 text-left">User Test</h4>
                <small
                  tag="span"
                  className="ml-1 text-left text-primary font-weight-bolder"
                >
                  Oficial del Ministerio
                </small>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </CardBody>
  </Card>
)

export default CardProfile
