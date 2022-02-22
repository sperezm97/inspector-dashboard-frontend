import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import Cleave from 'cleave.js/react'

import { Col, FormGroup, Label , Button } from 'reactstrap'
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
import { getGroups, putGroup } from '../../../../../services/zammad/group'

const institutionCreate = ({ history, match }) => {
  const idParams = match.params.id

  const dispatch = useDispatch()

  const [dataInstitution, setDataInstitution] = useState([])
  const [dataGroups, setDataGroups] = useState([])
  console.log('dataGroups', dataGroups)

  const [allGroups, setAllGroups] = useState([])

  const [loadingState, setLoadingState] = useState(false)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}
  const [ servicesValueState, setServicesValueState ] = useState(defaultValueState)
  const [ managerValueState, setManagerValueState ] = useState(defaultValueState)

  useEffect(() => {
    dispatch(getAllServicesActions())
    dispatch(getAllUsersActions())

    getOrganizationById(idParams)
      .then(res => setDataInstitution(res.data))
      .catch(err => {
        console.log(err)
        sweetAlertError()
      })

    getGroups()
      .then(res => setAllGroups(res.data))
      .catch(err => console.log(err))
  }, [])

  const servicesSelector = useSelector((state) => state?.services?.services)
  const usersSelector = useSelector((state) => state?.users?.users)

  const { register, handleSubmit, errors, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })

  useEffect(() => {
    if(servicesSelector[0] && Object.keys(dataInstitution)[0]){
      filterSelectServices(dataInstitution.service)
      setValue("phonenumber", dataInstitution.phonenumber || '')
    }
  }, [servicesSelector, dataInstitution])

  useEffect(() => {
    if(usersSelector[0] && Object.keys(dataInstitution)[0]){
      filterSelectManager(dataInstitution.manager)
    }
  }, [usersSelector, dataInstitution])

  useEffect(() => {
    if(allGroups[0] && Object.keys(dataInstitution)[0]){
      setDataGroups(allGroups.find(group => group?.acronimo?.toUpperCase() === dataInstitution?.acronimo?.toUpperCase()))
    }
  }, [allGroups, dataInstitution])
  
  const filterSelectServices = (id) => {
    if(!id) return
    const optionFiltered = servicesSelector.find(option => option.id === id)
    setServicesValueState({value: optionFiltered.id, label: optionFiltered.name})
    setValue('servicio', id)
  }

  const filterSelectManager = (id) => {
    if(!id) return
    const optionFiltered = usersSelector.find(option => option.id === id)
    setManagerValueState({value: optionFiltered.id, label: `${optionFiltered.firstname} ${optionFiltered.lastname}`})
    setValue('encargado', id)
  }

  const onSubmit = async (data) => {
    const objZammad = {
      name: data.name,
      acronimo: data.acronimo.toUpperCase(),
      service: data.servicio,
      phonenumber: data.phonenumber,
      address: data.address,
      email: data.email,
      domain: data.website,
      manager: data.encargado,
    }
    console.log(objZammad)
    setLoadingState(true)
    putOrganization(idParams, objZammad)
      .then(response => {
        if (response.status === 200) {
          putGroup(dataGroups.id, {name: objZammad.name, acronimo: objZammad.acronimo})
            .then(() => {
              sweetAlertGood()
              history.push(Url.institution)
            })
            .catch(() => {
              sweetAlertError()
              setLoadingState(false)
            })
        }
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
          defaultValue={dataInstitution && dataInstitution?.name}
        />

        <InputApp
          label="Acrónimo"
          name="acronimo"
          register={register}
          placeholder="Escribe el Acrónimo"
          messageError={
            errors.acronimo?.message && 'El Acrónimo es obligatorio'
          }
          defaultValue={dataInstitution && dataInstitution?.acronimo}
        />
        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Servicio</Label>
            <Controller
              control={control}
              name="servicio"
              render={({field}) => <Select 
                {...field} 
                onChange={e => filterSelectServices(e.value)}
                value={servicesValueState}
                options={optionsZammadIdValueSelect(servicesSelector)}
                isLoading={!servicesSelector[0]}
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
              render={({field}) => <Cleave
                {...field}
                className="form-control"
                placeholder="Escribe el Teléfono"
                onChange={e => setValue("phonenumber", e.target.value)}
                value={dataInstitution && dataInstitution?.phonenumber}
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
          defaultValue={dataInstitution && dataInstitution?.address}
        />

        <InputApp
          label="Correo Electrónico"
          name="email"
          register={register}
          placeholder="Escribe el Correo Electrónico"
          messageError={
            errors.email?.message && errors.email?.message
          }
          defaultValue={dataInstitution && dataInstitution?.email}
        />

        <InputApp
          label="Sitio Web"
          name="website"
          register={register}
          placeholder="Escribe el Sitio Web"
          messageError={
            errors.website?.message && errors.website?.message
          }
          defaultValue={dataInstitution && dataInstitution?.domain}
        />

        <Col lg="4" md="6" sm="12">
          <FormGroup>
            <Label>Encargado</Label>
            <Controller
              control={control}
              name="encargado"
              render={({field}) => <Select 
                {...field} 
                onChange={e => filterSelectManager(e.value)}
                value={managerValueState}
                options={usersSelector.map(data => ({
                  value: data.id,
                  label: `${data.firstname} ${data.lastname}`
                }))}
                isLoading={!usersSelector[0]}
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
