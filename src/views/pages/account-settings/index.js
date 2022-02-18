// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Third Party Components
import { User } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import { Col, FormGroup, Label } from 'reactstrap'

import CardGrid from '../../../@core/components/card-grid'
import FormApp from '../../../@core/components/form'
import InputApp from '../../../@core/components/input'

import { postUser } from '../../../services/zammad/user'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getAllOrganizationsActions } from '../../../redux/actions/zammad/organizations'
import { getAllRolsActions } from '../../../redux/actions/zammad/rols'
import { getAllRegionsActions } from '../../../redux/actions/territories/regions'
import {
  optionsIdentifierValueSelect,
  selectThemeColors,
} from '../../../utility/Utils'
import { getAllProvincesActions } from '../../../redux/actions/territories/provinces'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'
import { getUserMeActions } from '../../../redux/actions/zammad/users'

const schema = yup.object().shape({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  // organization: yup.string().required().trim(),
  // rols: yup.string().required().trim(),
  cedula: yup.string().required(),
  phone: yup.number().required(),
  // zone: yup.string().required().trim(),
  password: yup.string().required().trim(),
})

const UserConfig = function() {
  const dispatch = useDispatch()

  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
    dispatch(getAllRolsActions())
    dispatch(getAllProvincesActions())
    dispatch(getUserMeActions())
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations,
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const provincesSelector = useSelector(
    (state) => state?.provinces?.allProvinces,
  )

  const userMeSelector = useSelector((state) => state?.users?.userMe)

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    const objZammad = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      login: data.email,
      organization: data.institucion.label,
      roles: data.rols.map((data) => data.label),
      cedula: data.cedula,
      phone: data.phone,
      zone: data.provincia.value,
      password: data.password,
    }

    console.log('objZammad', objZammad)
    // const { dataPost, loading, error } = postUser(objZammad)
    console.log('dataPost, loading, error', dataPost, loading, error)
  }

  return Object.keys(userMeSelector)[0] ? (
    <CardGrid cardHeaderTitle="Ajustes">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingState}
      >
        <Col sm="12">
          <h4 className="mb-1">
            <User size={20} className="mr-50" />
            <span className="align-middle">Información Personal</span>
          </h4>
        </Col>

        <InputApp
          label="Nombre"
          name="firstName"
          register={register}
          placeholder="Escribe el Nombre"
          defaultValue={userMeSelector.firstname}
          messageError={errors.firstName?.message && 'El Nombre es obligatorio'}
        />

        <InputApp
          label="Apellido"
          name="lastName"
          register={register}
          placeholder="Escribe el Apellido"
          defaultValue={userMeSelector.lastname}
          messageError={
            errors.lastName?.message && 'El Apellido es obligatorio'
          }
        />

        <InputApp
          type="number"
          label="Cédula de Identidad"
          name="cedula"
          register={register}
          placeholder="Escribe la Cédula"
          defaultValue={userMeSelector.cedula}
          messageError={errors.cedula?.message && 'La Cédula es obligatoria'}
        />

        <InputApp
          type="email"
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          defaultValue={userMeSelector.email}
          messageError={
            errors.email?.message && 'El Correo Electrónico es obligatorio'
          }
        />

        <InputApp
          type="number"
          label="Teléfono"
          name="phone"
          register={register}
          placeholder="Escribe el Teléfono"
          defaultValue={userMeSelector.phone}
          messageError={errors.phone?.message && 'El Teléfono es obligatorio'}
        />

        <InputApp
          select
          label="Institución"
          name="institucion"
          selectOptions={dataTableOrganizations}
          register={register}
          control={control}
          defaultValue={userMeSelector.organization_id}
          messageError={
            errors.institucion?.message && 'La Institución es obligatoria'
          }
          placeholder="Escribe la Institución"
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Permisos</Label>
            <Controller
              control={control}
              name="rols"
              onChange={register}
              defaultValue={userMeSelector.role_ids}
              render={({ onChange, name }) => (
                <Select
                  isMulti
                  name={name}
                  theme={selectThemeColors}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={onChange}
                  options={rolSelector.map((dataMap) => ({
                    value: dataMap.id,
                    label: dataMap.name,
                  }))}
                />
              )}
            />
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Provincia</Label>
            <Controller
              control={control}
              name="provincia"
              defaultValue={userMeSelector.zone}
              onChange={register}
              render={({ onChange, defaultValue, name }) => (
                <Select
                  theme={selectThemeColors}
                  name={name}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={defaultValue}
                  isLoading={!provincesSelector[0]}
                  options={optionsIdentifierValueSelect(provincesSelector)}
                  onChange={onChange}
                  // noOptionsMessage={({ inputValue }) =>
                  //   noOptionsMessageSelect(
                  //     inputValue,
                  //     territoriesLabel.selectNoRegionsFound,
                  //   )
                  // }
                />
              )}
            />
          </FormGroup>
        </Col>

        <InputApp
          type="password"
          label="Contraseña"
          name="password"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.password?.message && 'La Contraseña es obligatoria'
          }
        />

        <InputApp
          type="password"
          label="Confirmar Contraseña"
          name="cPassword"
          register={register}
          placeholder="Escribe la Contraseña"
          messageError={
            errors.cPassword?.message && 'Las Contraseñas no coinciden'
          }
        />
      </FormApp>
    </CardGrid>
  ) : (
    <ComponentSpinner />
  )
}

export default UserConfig
