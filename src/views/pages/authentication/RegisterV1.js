import { User, MapPin } from 'react-feather'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from 'reactstrap'

import LogoIcon from '@src/assets/images/logo/icon.png'

import '@styles/base/pages/page-auth.scss'

const RegisterV1 = () => (
  <div className="auth-wrapper auth-v1 px-2" style={{ background: '#044386' }}>
    <div className="auth-inner auth-inner-two py-2">
      <Card className="mb-0">
        <CardBody>
          <div className="d-flex justify-content-start align-items-end mt-2 mb-4">
            <img src={LogoIcon} width={50} alt="Logo" />
            <h4 className="brand-text text-primary ml-1">
              Reportero de la Gestión Gubernamental
            </h4>
          </div>
          <CardTitle tag="h4" className="mb-0">
            Registro de Reporteros
          </CardTitle>
          {/* <CardText className='mb-2'>Por favor completa la información</CardText> */}
          <CardText tag="h5" className="mt-2 mb-0">
            <User size={20} className="mr-50" />
            <span className="align-middle">Información Personal</span>
          </CardText>
          {/* <Label className='form-label mb-1'>Completar con sus datos personales</Label> */}
          <Form
            className="auth-register-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Row>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label className="form-label" for="register-name">
                    Nombre
                  </Label>
                  <Input
                    type="text"
                    id="register-name"
                    placeholder="Nombre"
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label className="form-label" for="register-lastname">
                    Apellido
                  </Label>
                  <Input
                    type="text"
                    id="register-lastname"
                    placeholder="Apellido"
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label className="form-label" for="register-username">
                    Cédula
                  </Label>
                  <Input
                    type="text"
                    id="register-username"
                    placeholder="000-0000000-0"
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label className="form-label" for="register-telephone">
                    Número de Teléfono
                  </Label>
                  <Input
                    type="text"
                    id="register-telephone"
                    placeholder="809-220-1111"
                    autoFocus
                  />
                </FormGroup>
              </Col>

              <Col lg="12" md="12">
                <CardText tag="h5" className="mt-0 mb-0">
                  <MapPin size={20} className="mr-50" />
                  <span className="align-middle">Su Zona de Trabajo</span>
                </CardText>
                {/* <Label className='form-label mb-1'>Seleccione el lugar que está a su cargo</Label> */}
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="Provincia">Provincia</Label>
                  <Input type="select" name="Provincia" id="Provincia">
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="Municipio">Municipio</Label>
                  <Input type="select" name="Municipio" id="Municipio">
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="DistritoMunicipal">Distrito Municipal</Label>
                  <Input
                    type="select"
                    name="DistritoMunicipal"
                    id="DistritoMunicipal"
                  >
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="Sección">Sección</Label>
                  <Input type="select" name="Sección" id="Sección">
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="BarrioParaje">Barrio/Paraje</Label>
                  <Input type="select" name="BarrioParaje" id="BarrioParaje">
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6" md="12">
                <FormGroup>
                  <Label for="SubBarrio">Sub Barrio</Label>
                  <Input type="select" name="SubBarrio" id="SubBarrio">
                    <option value="">Seleccione</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col lg="12" md="12">
                <Button.Ripple color="primary" className="mt-1" block>
                  Registrarme
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  </div>
)

export default RegisterV1
