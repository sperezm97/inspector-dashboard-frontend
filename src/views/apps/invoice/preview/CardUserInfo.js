import Avatar from '@components/avatar'
import { Card, CardBody, CardImg, Badge, Col, CardText, Row } from 'reactstrap'
import profileImg from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { Users, Box } from 'react-feather'

const CardProfile = () => (
  <Card className="card-profile">
    <CardBody>
      <Col
        xl="12"
        lg="12"
        className="d-flex flex-column justify-content-between border-container-lg"
      >
        <div className="user-avatar-section">
          <div className="d-flex mb-1">
            <div className="profile-image-wrapper ml-5 ">
              <div className="profile-image mt-2">
                <Avatar img={profileImg} size="lg" />
              </div>
            </div>
            <div className="d-flex flex-column ml-5 mt-2">
              <div className="user-info mb-1">
                <h4 className="mb-0 ml-1 text-left">User Test</h4>
                <small
                  tag="span"
                  className="ml-1 text-left text-primary font-weight-bolder"
                >
                  Reportero encargado
                </small>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <hr className="mb-2" />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Row>
            <Col xl={1} md={1} sm={1}>
              <Avatar
                className=""
                color="light-warning"
                icon={<Box size={25} />}
              />
            </Col>
            <Col className="text-left ml-1">
              <h3 className="mb-0">10.3k</h3>
              <h6 className="text-muted font-weight-bolder">Casos asignados</h6>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col xl={1} md={1} sm={1}>
              <Avatar
                className="rounded"
                color="light-danger"
                icon={<Users size={25} />}
              />
            </Col>
            <Col className="text-left ml-1">
              <h3 className="mb-0">10.3k</h3>
              <h6 className="text-muted font-weight-bolder">Casos Resueltos</h6>
            </Col>
          </Row>
        </div>
      </div>
    </CardBody>
  </Card>
)

export default CardProfile
