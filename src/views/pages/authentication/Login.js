import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import axios from 'axios'
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

const ToastContent = function({ name }) {
  return <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Bienvenido, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        Has iniciado sesión con éxito en Reportero de la Gestión Gubernamental.
      </span>
    </div>
  </>
}

const Login = function(props) {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorLogin, setErrorLogin] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)

  const { register, errors, handleSubmit } = useForm()

  console.log('la variable: ', process.env.REACT_APP_API_URL)

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      const parseToBase = window.btoa(
        unescape(
          encodeURIComponent(`${data.loginEmail}:${data.loginPassword}`),
        ),
      )
      setLoadingLogin(true)
      const request = axios
        .get(`${process.env.REACT_APP_API_URL}users/me`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Basic ${parseToBase}`,
          },
        })
        .then((res) => {
          const data = {
            id: 1,
            fullName: `${res.data.firstname} ${res.data.lastname}`,
            username: res.data.firstname,
            password: 'admin',
            cedula: res.data.cedula,
            avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg')
              .default,
            email: res.data.email,
            role: 'admin',
            ability: [
              {
                action: 'manage',
                subject: 'all',
              },
            ],
            extras: {
              eCommerceCartItemsCount: 5,
            },
            zammadUser: res.data,
            accessToken: parseToBase,
            refreshToken: parseToBase,
          }
          dispatch(handleLogin(data))
          ability.update(data.ability)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent
              name={data.fullName || data.username || ''}
              role={data.role || 'admin'}
            />,
            { transition: Slide, hideProgressBar: true, autoClose: 10000 },
          )
        })
        .catch((err) => {
          setLoadingLogin(false)
          setErrorLogin(true)
          console.log(err.message)
        })
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
                <Label className="form-label" for="loginEmail">
                  Correo Electrónico
                </Label>
                <Input
                  autoFocus
                  type="email"
                  value={email}
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="tucorreo@ejemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({
                    'is-invalid': errors.loginEmail,
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== '',
                  })}
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="loginPassword">
                    Contraseña
                  </Label>
                  <Link to="/pages/forgot-password-v1">
                    <small>¿Olvidaste tu Contraseña?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id="loginPassword"
                  name="loginPassword"
                  className="input-group-merge"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames({
                    'is-invalid': errors.loginPassword,
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== '',
                  })}
                />
              </FormGroup>
              {/* <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label="Recuerdame"
                />
              </FormGroup> */}
              <p style={{ marginBottom: '10px', color: 'red' }}>
                {errorLogin &&
                  'Error al autenticar, por favor verifique sus datos.'}
              </p>
              <Button.Ripple
                type="submit"
                color="primary"
                block
                disabled={loadingLogin}
              >
                {loadingLogin ? 'Cargando...' : 'Login'}
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
