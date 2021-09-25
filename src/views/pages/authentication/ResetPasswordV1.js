import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Button,
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import LogoAuth from '../../../@core/components/logo-auth'

const ResetPasswordV1 = () => (
  <div className="auth-wrapper auth-v1 px-2">
    <div className="auth-inner py-2">
      <Card className="mb-0">
        <CardBody>
          <LogoAuth />
          <CardTitle tag="h4" className="mb-1">
            Restablecer Contraseña
          </CardTitle>
          <CardText className="mb-2">
            Tu nueva contraseña debe ser diferente a la anterior.
          </CardText>
          <Form
            className="auth-reset-password-form mt-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormGroup>
              <Label className="form-label" for="new-password">
                Nueva Contraseña
              </Label>
              <InputPassword
                className="input-group-merge"
                id="new-password"
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-label" for="confirm-password">
                Confirmar Contraseña
              </Label>
              <InputPassword
                className="input-group-merge"
                id="confirm-password"
              />
            </FormGroup>
            <Button.Ripple color="primary" block>
              Guardar
            </Button.Ripple>
          </Form>
          <p className="text-center mt-2">
            <Link to="/pages/login-v1">
              <ChevronLeft className="mr-25" size={14} />
              <span className="align-middle">Regresar</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  </div>
)

export default ResetPasswordV1
