import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Select from 'react-select'

import XLSX from 'xlsx'
import Uppy from '@uppy/core'
import { X } from 'react-feather'
import Avatar from '@components/avatar'
import { toast } from 'react-toastify'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  FormGroup,
  Label,
  Form,
  Spinner,
} from 'reactstrap'
import { schemaYup } from './schemaYup'

import { getTicketPriorities } from '../../../../services/zammad/ticketPriorities'
import { getTicketStates } from '../../../../services/zammad/ticketStates'
import { optionsNoteValueSelect, selectThemeColors } from '../../../../utility/Utils'
import { getAllUsersActions } from '../../../../redux/actions/zammad/users'

import { Instructions } from './instructions'
import { ExampleTable } from './exampleTable'
import { DropFile } from './dropFile'
import { postTicketImport } from '../../../../services/zammad/ticketImport'
import { sweetAlert } from '../../../../@core/components/sweetAlert'
import Url from '../../../../constants/Url'


const ErrorToast = function() {
  return <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Error!</h6>
      </div>
      {/* <small className="text-muted">a second ago</small> */}
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 Sólo puedes subir archivos <span className="font-weight-bolder">.csv</span>
      </span>
    </div>
  </>
}

const Import = function({history}) {

  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([])
  // const [filteredData, setFilteredData] = useState([])
  // const [valueI, setValueI] = useState('')
  const [name, setName] = useState('')
  const [loadingImport, setLoadingImport] = useState(false)

  const [ticketPriorities, setTicketPriorities] = useState([])
  const [ticketStates, setTicketStates] = useState([])

  const usersSelector = useSelector((state) => state?.users?.users)

  const defaultValueState = {value: '', label: 'Sin Seleccionar'}

  const { handleSubmit, errors, setValue, control } = useForm({
    resolver: yupResolver(schemaYup),
  })

  useEffect(() => {
  
    getTicketPriorities()
      .then(res => setTicketPriorities(res.data))
    getTicketStates()
      .then(res => setTicketStates(res.data))

    dispatch(getAllUsersActions())
  
    }, [])

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  })

  const getTableData = (arr, name) => {
    setTableData(arr)
    setName(name)
  }

  uppy.on('complete', (result) => {
    const reader = new FileReader()
    reader.onload = function () {
      const fileData = reader.result
      const wb = XLSX.read(fileData, { type: 'binary' })

      wb.SheetNames.forEach((sheetName) => {
        const rowObj = XLSX.utils.sheet_to_json(
          wb.Sheets[sheetName], { raw: false }
        )
        getTableData(rowObj, result.successful[0].data.name)
      })
    }
    if (result.successful[0].extension === 'csv') {
      reader.readAsBinaryString(result.successful[0].data)
    } else {
      toast.error(<ErrorToast />, { hideProgressBar: true })
    }
  })

  const onSubmit = (data) => {
    const objAddCsv = {
      priority_id: data.prioridad,
      state_id: data.estado,
      owner_id: data.encargado,
    }

    setLoadingImport(true)

    let newArrCsv = []

    tableData.map(async (dataCsv, index) => {
      newArrCsv = [...newArrCsv, Object.assign(dataCsv, objAddCsv)]
      const ticketAsync = await postTicketImport(dataCsv, objAddCsv)
      if(ticketAsync.status === 201){
        sweetAlert({
          title: 'Tickets Importados',
          text: 'Los Tickets se importaron con éxito.',
          type: 'success'
        })
        history.push(Url.dashboardInbox)

      }else {  
        sweetAlert({
          title: 'Ticket No creado',
          text: `Ocurrió un error al crear el Ticket de la línea ${(index + 2)} del archivo CSV.`,
        })
        setLoadingImport(false)
      }
    })    
  }

  return (
    <>
      <Instructions />

      <Row className="import-component">

        <ExampleTable />

        <Col sm="12">
          <Card>
            {tableData[0] &&
              <>
                <CardHeader className="justify-content-between flex-wrap">
                  <CardTitle tag="h4">{name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col lg="4" md="6" sm="12">
                        <FormGroup>
                          <Label>Prioridad</Label>
                            <Controller
                              control={control}
                              name="prioridad"
                              render={({field}) => <Select 
                                {...field} 
                                onChange={e => setValue("prioridad", e.value)}
                                options={optionsNoteValueSelect(ticketPriorities)}
                                isLoading={!ticketPriorities[0]}
                                defaultValue={defaultValueState}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                />}
                                />
                            <p className="text-danger">{
                              errors.prioridad?.message && errors.prioridad?.message
                            }</p>
                        </FormGroup>
                      </Col>

                      <Col lg="4" md="6" sm="12">
                        <FormGroup>
                          <Label>Estado</Label>
                            <Controller
                              control={control}
                              name="estado"
                              render={({field}) => <Select 
                              {...field} 
                                onChange={e => setValue("estado", e.value)}
                                options={optionsNoteValueSelect(ticketStates)}
                                isLoading={!ticketStates[0]}
                                defaultValue={defaultValueState}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                />}
                                />
                            <p className="text-danger">{
                              errors.estado?.message && errors.estado?.message
                            }</p>
                        </FormGroup>
                      </Col>

                      <Col lg="4" md="6" sm="12">
                        <FormGroup>
                          <Label>Encargado</Label>
                          <Controller
                            control={control}
                            name="encargado"
                            render={({field}) => <Select 
                            {...field} 
                              onChange={e => setValue('encargado', e.value)}
                              options={usersSelector.map(data => ({
                                value: data.id,
                                label: `${data.firstname} ${data.lastname}`
                              }))}
                              isLoading={!usersSelector[0]}
                              defaultValue={defaultValueState}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              />}
                              />
                          <p className="text-danger">{
                            errors.encargado?.message && errors.encargado?.message
                          }</p>
                        </FormGroup>
                      </Col>

                      <Col sm="12" className="mt-2">
                        <Button
                          type="submit"
                          color="primary"
                          className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                          disabled={loadingImport}
                          >
                          {loadingImport && <Spinner color='white' size='sm' />}
                          <span className={`${loadingImport && 'ml-50'}`}>
                              {loadingImport ? 'Importando...' : 'Importar'}
                          </span>
                        </Button>
                        <Button
                          color="primary"
                          className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                          disabled={loadingImport}
                          outline
                        >
                          Descargar Ejemplo
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </>
            }

            <CardBody>
              <DropFile uppy={uppy} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Import
