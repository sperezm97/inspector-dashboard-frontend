import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
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
} from 'reactstrap'

import LogoAuth from '../../../@core/components/logo-auth'

import '@styles/base/pages/page-auth.scss'

const ForgotPasswordV1 = () => (
  <div className="auth-wrapper auth-v1 px-2">
    <div className="auth-inner py-2">
      <Card className="mb-0">
        <CardBody>
          <LogoAuth />
          <CardTitle tag="h4" className="mb-1">
            ¿Olvidaste tu Contraseña?
          </CardTitle>
          <CardText className="mb-2">
            Escribe tu correo electrónico donde te enviaremos un mensaje con las
            instrucciones para restablecer tu contraseña.
          </CardText>
          <Form
            className="auth-forgot-password-form mt-2"
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
            <Button.Ripple color="primary" block>
              Enviar Correo
            </Button.Ripple>
          </Form>
          <p className="text-center mt-2">
            <Link to="/login">
              <ChevronLeft className="mr-25" size={14} />
              <span className="align-middle">Regresar</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  </div>
)

export default ForgotPasswordV1
