import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Select from 'react-select'

import { schemaYup } from './schemaYup'

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

import { getTicketPriorities } from '../../../../services/zammad/ticketPriorities'
import { getTicketStates } from '../../../../services/zammad/ticketStates'
import { optionsNoteValueSelect, selectThemeColors } from '../../../../utility/Utils'
import { getAllUsersActions } from '../../../../redux/actions/zammad/users'

import { Instructions } from './instructions'
import { ExampleTable } from './exampleTable'
import { DropFile } from './dropFile'


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

const Import = function() {

  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([])
  console.log(tableData);
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
        const rowObj = XLSX.utils.sheet_to_row_object_array(
          wb.Sheets[sheetName],
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

  // const handleFilter = (e) => {
  //   const data = tableData
  //   let filteredData = []
  //   const { value } = e.target
  //   setValueI(value)

  //   if (valueI.length) {
  //     filteredData = data.filter((col) => {
  //       const keys = Object.keys(col)

  //       const startsWithCondition = keys.filter((key) =>
  //         col[key].toString().toLowerCase().startsWith(value.toLowerCase()),
  //       )

  //       const includesCondition = keys.filter((key) =>
  //         col[key].toString().toLowerCase().includes(value.toLowerCase()),
  //       )

  //       if (startsWithCondition.length) return col[startsWithCondition]
  //       if (!startsWithCondition && includesCondition.length)
  //         return col[includesCondition]
  //       return null
  //     })
  //     setFilteredData(filteredData)
  //     setValueI(value)
  //   } else {
  //     return null
  //   }
  // }
  /*eslint-disable */
  // const headArr = tableData.length
  //   ? tableData.map((col, index) => {
  //       if (index === 0) return [...Object.keys(col)]
  //       else return null
  //     })
  //   : []
  /* eslint-enable */
  // const dataArr = valueI.length
  //   ? filteredData
  //   : tableData.length && !valueI.length
  //   ? tableData
  //   : null

  // const renderTableBody = () => {
  //   if (dataArr !== null && dataArr.length) {
  //     return dataArr.map((col, index) => {
  //       const keys = Object.keys(col)
  //       const renderTd = keys.map((key, index) => (
  //         <td key={index}>{col[key]}</td>
  //       ))
  //       return <tr key={index}>{renderTd}</tr>
  //     })
  //   }
  //   return null
  // }

  // const renderTableHead = () => {
  //   if (headArr.length) {
  //     return headArr[0].map((head, index) => <th key={index}>{head}</th>)
  //   }
  //   return null
  // }

  const onSubmit = (data) => {
    console.log(data);
    const objAddCsv = {
      priority_id: data.prioridad,
      state_id: data.estado,
      owner_id: data.encargado,
    }
  }

  return (
    <>
      <Instructions />

      <Row className="import-component">

        <ExampleTable />

        {tableData[0] &&
          <Col sm="12">
            <Card>
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
            </Card>
          </Col>
        }

        <DropFile uppy={uppy} />

      </Row>
    </>
  )
}

export default Import
