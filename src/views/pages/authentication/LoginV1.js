import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
} from 'reactstrap'

import Logo from '@src/assets/images/logo/logo.png'

import '@styles/base/pages/page-auth.scss'

const LoginV1 = ({ history }) => (
  <div className="auth-wrapper auth-v1 px-2">
    <div className="auth-inner py-2">
      <Card className="mb-0">
        <CardBody>
          <div className="d-flex justify-content-center mt-2 mb-4">
            <img src={Logo} width={250} alt="Logo" />
          </div>
          <CardTitle tag="h4" className="mb-1">
            Bienvenido al Reportero de la Gestión Gubernamental
          </CardTitle>
          <CardText className="mb-2">
            Inicie sesión en su cuenta para empezar el trabajo!
          </CardText>
          <Form
            className="auth-login-form mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormGroup>
              <Label className="form-label" for="login-email">
                Correo Electrónico
              </Label>
              <Input
                type="email"
                id="login-email"
                placeholder="john@example.com"
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <div className="d-flex justify-content-between">
                <Label className="form-label" for="login-password">
                  Contraseña
                </Label>
                <Link to="/pages/forgot-password-v1">
                  <small>¿Olvidaste tu Contraseña?</small>
                </Link>
              </div>
              <InputPasswordToggle
                className="input-group-merge"
                id="login-password"
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="remember-me"
                label="Recuerdame"
              />
            </FormGroup>
            <Button.Ripple
              color="primary"
              block
              onClick={() => history.push('/')}
            >
              Login
            </Button.Ripple>
          </Form>
        </CardBody>
      </Card>
    </div>
  </div>
)

export default LoginV1
