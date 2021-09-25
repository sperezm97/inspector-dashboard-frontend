import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
} from 'reactstrap'

import LogoAuth from '../../../@core/components/logo-auth'

import '@styles/base/pages/page-auth.scss'

const ToastContent = ({ name, role }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to Vuexy. Now you can
        start to explore. Enjoy!
      </span>
    </div>
  </>
)

const Login = (props) => {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('admin')

  const { register, errors, handleSubmit } = useForm()

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      useJwt
        .login({ email, password })
        .then((res) => {
          const data = {
            ...res.data.userData,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }
          dispatch(handleLogin(data))
          ability.update(res.data.userData.ability)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent
              name={data.fullName || data.username || 'John Doe'}
              role={data.role || 'admin'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 },
          )
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="auth-wrapper auth-v1 px-2">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <LogoAuth />
            <CardTitle tag="h4" className="mb-1">
              Bienvenido al Reportero de la Gestión Gubernamental
            </CardTitle>
            <CardText className="mb-2">
              Inicie sesión en su cuenta para empezar el trabajo!
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Correo Electrónico
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="login-email"
                  name="login-email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({
                    'is-invalid': errors['login-email'],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== '',
                  })}
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
                  value={password}
                  id="login-password"
                  name="login-password"
                  className="input-group-merge"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({
                    'is-invalid': errors['login-password'],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== '',
                  })}
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
              <Button.Ripple type="submit" color="primary" block>
                Login
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
