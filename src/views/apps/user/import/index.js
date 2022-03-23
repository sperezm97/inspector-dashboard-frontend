import { useState } from 'react'

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
  Spinner,
} from 'reactstrap'

import { Instructions } from './instructions'
import { ExampleTable } from './exampleTable'
import { DropFile } from './dropFile'
import { sweetAlert } from '../../../../@core/components/sweetAlert'
import Url from '../../../../constants/Url'
import { postUserImport } from '../../../../services/zammad/userImport'
import { getOrganizations } from '../../../../services/zammad/organization'
import { getGroups } from '../../../../services/zammad/group'
import { postTicketImportOG } from '../../../../services/zammad/ticketImport'


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

  const [tableData, setTableData] = useState([])

  const [name, setName] = useState('')
  const [loadingImport, setLoadingImport] = useState(false)

  const [usersCreated, setUsersCreated] = useState(0)
  console.log('usersCreated', usersCreated)

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
      reader.readAsText(result.successful[0].data, 'UTF-8')
    } else {
      toast.error(<ErrorToast />, { hideProgressBar: true })
    }
  })

  const onSubmit = async () => {

    const validateArrCSV = tableData.every(data => 
      data?.cedula?.length > 0 && 
      data?.correo?.length > 0 && 
      data?.institucion?.length > 0 &&
      data?.zona_id?.length > 0 &&
      data?.telefono?.length > 0
    )

    if(!validateArrCSV) {
      return sweetAlert({
        title: 'Aviso',
        text: 'Si desea importar todos los usuarios proporciona todos los campos de validación necesarios.',
        type: 'warning'
      })
    }

    const searchOnTable = tableData.reduce((acc, data) => {
      acc[data.correo.toLowerCase()] = ++acc[data.correo.toLowerCase()] || 0
      return acc
    }, {})
    
    const validateDataNoRepet = tableData.filter( (data) => searchOnTable[data.correo])

    if(validateDataNoRepet[0]) {
      return sweetAlert({
        title: 'Aviso',
        text: 'Si desea importar, verifique que los correos no se repitan.',
        type: 'warning'
      })
    }

    console.log('validateDataNoRepet', validateDataNoRepet)

    setLoadingImport(true)

    let organizationData = []
    let groupData = []
    
    organizationData = await (await getOrganizations()).data
    groupData = await (await getGroups()).data

    const arrTablaDataFilter = tableData.map(item => item.institucion)
    const newArrTablaDataFilter = arrTablaDataFilter.filter((item, index)=> arrTablaDataFilter.indexOf(item) === index)
    console.log('newArrTablaDataFilter', newArrTablaDataFilter)
    const postAllOG = await Promise.all(
      newArrTablaDataFilter.map(async (dataOG) => await postTicketImportOG(dataOG.toUpperCase()))
    ).then(res => console.log('res', res))
    .catch(err => console.log('err', err))

    for(let i = 0; i <= tableData.length - 1; i++){
      console.log(i)
      const postAllUser = await postUserImport(tableData[i])
      if(postAllUser?.status === 200 || postAllUser?.status === 201){
        console.log("ok")
        setUsersCreated(i + 1)
      }else {
        console.log("no ok", i + 1)
        sweetAlert({
          title: 'Algunos Usuarios No creados',
          text: `Se produjo un error al crear el usuario ${i + 1} del archivo CSV, verifíquelo o inténtelo de nuevo sin los usuarios anteriores a este`,
          type: 'warning'
        })
        setTableData([])
        setUsersCreated(0)
        setLoadingImport(false)
        break
      }
      if(i === tableData.length - 1){
        sweetAlert({
          title: 'Usuarios Importados',
          text: 'Los Usuarios se importaron con éxito, recuerde que la contraseña de los usuarios es su propia cédula.',
          type: 'success'
        })
        history.push(Url.user)
      }
    }
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
                  <Row>
                    <Col sm="12">
                      <Button
                        color="primary"
                        className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                        disabled={loadingImport}
                        onClick={onSubmit}
                        >
                        {loadingImport && <Spinner color='white' size='sm' />}
                        <span className={`${loadingImport && 'ml-50'}`}>
                          {loadingImport ? `Importados: ${usersCreated} de ${tableData.length}...` : 'Importar'}
                        </span>
                      </Button>
                    </Col>
                  </Row>
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
