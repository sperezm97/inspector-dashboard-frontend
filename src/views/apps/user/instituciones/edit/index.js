import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import Cleave from 'cleave.js/react'

import { Col, FormGroup, Label, Button } from 'reactstrap'
import { Plus } from 'react-feather'

import FormApp from '../../../../../@core/components/form'
import InputApp from '../../../../../@core/components/input'
import CardGrid from '../../../../../@core/components/card-grid'
import { IconInstitution } from '../../../../../@core/components/icons'
import { optionsZammadIdValueSelect, selectThemeColors } from '../../../../../utility/Utils'
import Url from '../../../../../constants/Url'
import { getOrganizationById, putOrganization } from '../../../../../services/zammad/organization'
import { getAllServicesActions } from '../../../../../redux/actions/incidents/services'
import { getAllUsersActions } from '../../../../../redux/actions/zammad/users'
import { sweetAlertError, sweetAlertGood } from '../../../../../@core/components/sweetAlert'
import { schemaYup } from './schemaYup'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import { strapiGetInstitutionById, strapiPutInstitutions } from '../../../../../services/strapi/institutions'
import { strapiGetServices } from '../../../../../services/strapi/services'
import { strapiGetUsers } from '../../../../../services/strapi/users'

const institutionCreate = ({ history, match }) => {
  const idParams = match.params.id

  const dispatch = useDispatch()

  const [dataInstitution, setDataInstitution] = useState([])
  console.log("dataInstitution", dataInstitution)
  const [dataGroups, setDataGroups] = useState([])
  const [dataServices, setDataServices] = useState([])
  console.log('dataServices', dataServices)
  const [dataUsers, setDataUsers] = useState([])

  const [loadingState, setLoadingState] = useState(false)

  const defaultValueState = { value: '', label: 'Sin Seleccionar' }
  const [servicesValueState, setServicesValueState] = useState(defaultValueState)
  console.log("servicesValueState", servicesValueState)
  const [managerValueState, setManagerValueState] = useState(defaultValueState)

  useEffect(() => {
    // dispatch(getAllServicesActions())
    // dispatch(getAllUsersActions())

    // getOrganizationById(idParams)
    //   .then(res => setDataInstitution(res.data))
    //   .catch(err => {
    //     console.log(err)
    //     sweetAlertError()
    //   })

    // getGroups()
    //   .then(res => setAllGroups(res.data))
    //   .catch(err => console.log(err))

    strapiGetInstitutionById(idParams)
      .then(res => setDataInstitution(res.data.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })

    strapiGetUsers()
      .then(res => {
        const newData = res.data.map((data) => ({ value: data.id, label: `${data.firstname} ${data.lastname}` }))
        setDataUsers(newData)
      })
      .catch(err => console.log(err))

    strapiGetServices()
      .then(res => {
        const newData = res.data.data.map((data) => ({ value: data.id, label: data.attributes.name }))
        setDataServices(newData)
      })
      .catch(err => console.logZ(err))

  }, [])

  const servicesSelector = useSelector((state) => state?.services?.services)
  const usersSelector = useSelector((state) => state?.users?.users)

  const { register, handleSubmit, errors, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })

  useEffect(() => {
    if (dataServices[0] && Object.keys(dataInstitution)[0]) {
      filterSelectServices(dataServices.find(data => data.value === dataInstitution?.attributes?.services?.data[0]?.id))
      setValue("phonenumber", dataInstitution?.attributes?.phone)
    }
  }, [dataServices, dataInstitution])

  useEffect(() => {
    if (usersSelector[0] && Object.keys(dataInstitution)[0]) {
      filterSelectManager(dataInstitution.manager)
    }
  }, [usersSelector, dataInstitution])

  useEffect(() => {
    if (dataUsers[0] && Object.keys(dataInstitution)[0]) {
      const newData = dataUsers.find(data => data.value === dataInstitution.id)
      filterSelectManager(newData)
    }
  }, [dataUsers, dataInstitution])

  const filterSelectServices = (e) => {
    if (!e?.value) return
    setServicesValueState(e)
    setValue('servicio', e.value)
  }

  const filterSelectManager = (e) => {
    if (!e?.value) return
    const optionFiltered = dataUsers.find(option => option.value === e.value)
    setManagerValueState(optionFiltered)
    setValue('encargado', optionFiltered?.value)
  }

  const onSubmit = async (data) => {

    const obj = {
      data: {
        name: data.name,
        acronym: data.acronimo.toUpperCase(),
        email: data.email,
        address: data.address,
        phone: data.phonenumber,
        website: data.website,
        services: [String(data.servicio)],
        owner: String(data.encargado),
      }
    }

    setLoadingState(true)
    // putOrganization(idParams, objZammad)
    //   .then(response => {
    //     if (response.status === 200) {
    //       putGroup(dataGroups.id, { name: objZammad.name, acronimo: objZammad.acronimo })
    //         .then(() => {
    //           sweetAlertGood()
    //           history.push(Url.institution)
    //         })
    //         .catch(() => {
    //           sweetAlertError()
    //           setLoadingState(false)
    //         })
    //     }
    //   })

    strapiPutInstitutions(idParams, obj)
      .then(() => {
        sweetAlertGood()
        history.push(Url.institution)
      })
      .catch((err) => {
        console.log(err.message)
        sweetAlertError()
        setLoadingState(false)
      })
  }

  return (
    <CardGrid cardHeaderTitle="Editar Institución">
      <FormApp
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loadingState}
        edit
      >
        <Col sm="12">
          <h4 className="mb-1">
            <IconInstitution size={20} className="mr-50" />
            <span className="align-middle">Información</span>
          </h4>
        </Col>

        <InputApp
          label="Nombre de la Institución"
          name="name"
          register={register}
          placeholder="Escribe la Institución"
          messageError={errors.name?.message && errors.name?.message}
          defaultValue={dataInstitution && dataInstitution?.attributes?.name}
        />

        <InputApp
          label="Acrónimo"
          name="acronimo"
          register={register}
          placeholder="Escribe el Acrónimo"
          messageError={
            errors.acronimo?.message && 'El Acrónimo es obligatorio'
          }
          defaultValue={dataInstitution && dataInstitution?.attributes?.acronym}
        />
        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Servicio</Label>
            <Controller
              control={control}
              name="servicio"
              render={({ field }) => <Select
                {...field}
                onChange={e => filterSelectServices(e)}
                value={servicesValueState}
                options={dataServices}
                isLoading={!dataServices[0]}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.servicio?.message && errors.servicio?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Teléfono</Label>
            <Controller
              control={control}
              name="phonenumber"
              render={({ field }) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("phonenumber", e.target.value)}
                value={dataInstitution && dataInstitution?.attributes?.phone}
                options={{ blocks: [10], numericOnly: true }}
              />}
            />
            <p className="text-danger">{
              errors.phonenumber?.message && errors.phonenumber?.message
            }</p>
          </FormGroup>
        </Col>

        <InputApp
          label="Dirección"
          name="address"
          register={register}
          placeholder="Escribe la Dirección"
          messageError={
            errors.address?.message && errors.address?.message
          }
          defaultValue={dataInstitution && dataInstitution?.attributes?.address}
        />

        <InputApp
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
          defaultValue={dataInstitution && dataInstitution?.attributes?.email}
        />

        <InputApp
          label="Sitio Web"
          name="website"
          register={register}
          placeholder="Escribe el Sitio Web"
          messageError={
            errors.website?.message && errors.website?.message
          }
          defaultValue={dataInstitution && dataInstitution?.attributes?.website}
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Encargado</Label>
            <Controller
              control={control}
              name="encargado"
              render={({ field }) => <Select
                {...field}
                onChange={e => filterSelectManager(e)}
                value={managerValueState}
                options={dataUsers}
                isLoading={!dataUsers[0]}
                classNamePrefix="select"
                theme={selectThemeColors}
              />}
            />
            <p className="text-danger">{
              errors.encargado?.message && errors.encargado?.message
            }</p>
          </FormGroup>
        </Col>

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label />
            <div>
              <Button.Ripple
                outline
                color='primary'
                onClick={() => history.push(Url.userCreate)}
              >
                <Plus size={14} />
                <span className='align-middle ml-25'>Añadir Usuario</span>
              </Button.Ripple>
            </div>
          </FormGroup>
        </Col>

      </FormApp>
    </CardGrid>
  )
}
export default institutionCreate
