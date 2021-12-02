// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Third Party Components
import { User } from 'react-feather'
import 'cleave.js/dist/addons/cleave-phone.us'
import {
  Col,
  FormGroup,
  Label
} from 'reactstrap'

import CardGrid from '../../../../@core/components/card-grid'
import FormApp from '../../../../@core/components/form'
import InputApp from '../../../../@core/components/input'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getAllOrganizationsActions } from '../../../../redux/actions/zammad/organizations'
import { getAllRolsActions } from '../../../../redux/actions/zammad/rols'
import { getAllRegionsActions } from '../../../../redux/actions/territories/regions'
import { optionsIdentifierValueSelect, selectThemeColors } from '../../../../utility/Utils';
import { getAllProvincesActions } from '../../../../redux/actions/territories/provinces';

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  // acronimo: yup.string().required().trim(),
  // phonenumber: yup.number().positive().integer().required(),
  // address: yup.string().required().trim(),
})

const UserCreate = () => {
  const dispatch = useDispatch()

  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    dispatch(getAllOrganizationsActions())
    dispatch(getAllRolsActions())
    dispatch(getAllProvincesActions())
  }, [])

  const dataTableOrganizations = useSelector(
    (state) => state?.organizations?.organizations,
  )
  const rolSelector = useSelector((state) => state?.rols?.rols)
  const provincesSelector = useSelector((state) => state?.provinces?.allProvinces)


  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <CardGrid cardHeaderTitle="Añadir Nuevo Usuario">
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
            name="name"
            register={register}
            placeholder="Escribe el Nombre"
            messageError={errors.name?.message && 'El Nombre es obligatorio'}
          />

          <InputApp
            label="Apellido"
            name="apellido"
            register={register}
            placeholder="Escribe el Apellido"
            messageError={errors.apellido?.message && 'El Apellido es obligatorio'}
          />

          <InputApp
            type='number'
            label="Cédula de Identidad"
            name="cedula"
            register={register}
            placeholder="Escribe la Cédula"
            messageError={errors.cedula?.message && 'La Cédula es obligatoria'}
          />

          <InputApp
            type="email"
            label="Correo Electrónico"
            name="email"
            register={register}
            placeholder="Escribe el Correo Electrónico"
            messageError={errors.email?.message && 'El Correo Electrónico es obligatorio'}
          />

          <InputApp
            type="number"
            label="Teléfono"
            name="telefono"
            register={register}
            placeholder="Escribe el Teléfono"
            messageError={errors.email?.message && 'El Teléfono es obligatorio'}
          />

          <InputApp
            select
            label="Institución"
            name="institucion"
            selectOptions={dataTableOrganizations}
            register={register}
            control={control}
            messageError={errors.institucion?.message && 'La Institución es obligatoria'}
            placeholder="Escribe la Institución"
          />

          <Col lg="4" md="6" sm="12">
            <FormGroup>
              <Label>Permisos</Label>
              <Controller
                control={control}
                name='permisos'
                onChange={register}
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
                      label: dataMap.name
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
                name='provincia'
                defaultValue={{value: '', label: 'Sin Seleccionar'}}
                onChange={register}
                render={({ onChange, value, name }) => (
                  <Select
                    theme={selectThemeColors}
                    name={name}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    value={value}
                    isLoading={provincesSelector[0] ? false : true}
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
            name="contraseña"
            register={register}
            placeholder="Escribe la Contraseña"
            messageError={errors.contraseña?.message && 'La Contraseña es obligatoria'}
          />

          <InputApp
            type="password"
            label="Confirmar Contraseña"
            name="cContraseña"
            register={register}
            placeholder="Escribe la Contraseña"
            messageError={errors.cContraseña?.message && 'Las Contraseñas no coinciden'}
          />

      </FormApp>
    </CardGrid>
  )
}
export default UserCreate
