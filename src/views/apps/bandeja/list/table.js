// ** React Imports
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Label, Input, Row, Col, Card, CardHeader, CardTitle } from 'reactstrap'

import { ExportButtons } from '../../../../@core/components/export-buttons'
import { ButtonRipple } from '../../../../@core/components/button'
import Url from '../../../../constants/Url'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ 
  handleFilter, 
  value, 
  handleStatusValue, 
  statusValue, 
  handlePerPage, 
  rowsPerPage, 
  showSelectStatus, 
  showButtonAdd,
  showButtonAddInstitution,
  componentButton
}) => {

  const history = useHistory()

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          {/* <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'>Mostrar</Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{border: 'none'}}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </CustomInput>
          </div> */}
          <ExportButtons />
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'>Buscar</Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Escribe...'
            />
          </div>
            {showSelectStatus &&
                <Input 
                    className='w-auto pr-4' 
                    type='select' 
                    value={statusValue} 
                    onChange={handleStatusValue}
                    style={{border: 'none'}}
                >
                    <option value=''>Seleccionar Estado</option>
                </Input>
            }
            {showButtonAdd &&
              <ButtonRipple 
                onClick={() => history.push(Url.userCreate)}
                label= 'Añadir Nuevo Usuario'
              />
            }
            {showButtonAddInstitution &&
              <ButtonRipple 
                onClick= {() => history.push(Url.institutionCreate)}
                label= 'Añadir Nueva Institución'
              />
            }
            {componentButton &&
              componentButton
            }
        </Col>
      </Row>
    </div>
  )
}

const DataTableList = ({ 
  columnsTable, 
  dataTable, 
  showSelectStatus = false, 
  showButtonAdd = false, 
  showButtonAddInstitution = false, 
  dataTableTitle = "",
  componentButton = false
}) => {

  const [newDataTable, setNewDataTable] = useState([])
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
  
    
    setNewDataTable(dataTable)
    
  }, [dataTable])
  
  const paginateArray = (array) => array.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  
  const handleFilter = val => {
    setValue(val)

    const queryLowered = val.toLowerCase()
    const filteredData = dataTable.filter(ticket => (
      (ticket.title || '').toLowerCase().includes(queryLowered) ||
      (ticket.address || '').toLowerCase().includes(queryLowered) ||
      (ticket.reporterFirstName || '').toLowerCase().includes(queryLowered) ||
      (ticket.reporterLastName || '').toLowerCase().includes(queryLowered) ||
      (ticket.reporterCedula || '').toLowerCase().includes(queryLowered) ||
      (ticket.institutionName || '').toLowerCase().includes(queryLowered) ||
      (ticket.institutionAcronym || '').toLowerCase().includes(queryLowered)
    ))

    setNewDataTable(filteredData)
  }

  const handlePerPage = e => {
    // dispatch(
    //   getTicketsFilterActions({
    //     page: currentPage,
    //     perPage: parseInt(e.target.value),
    //     status: statusValue,
    //     q: value
    //   })
    // )
    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    // dispatch(
    //   getTicketsFilterActions({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     status: e.target.value,
    //     q: value
    //   })
    // )
  }

  const handlePagination = page => {
    // dispatch(
    //   getTicketsFilterActions({
    //     page: page.selected + 1,
    //     perPage: rowsPerPage,
    //     status: statusValue,
    //     q: value
    //   })
    // )
    console.log('page ===>', page)
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((newDataTable.length / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        pageCount={count || 1}
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        activeClassName='active'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    // selectAllRowsItem: true,
    // selectAllRowsItemText: 'Todos',
  };

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        {dataTableTitle &&
          <CardHeader>
            <CardTitle tag='h4'>{dataTableTitle}</CardTitle>
          </CardHeader>
        }
        <div className='invoice-list-dataTable'>
          <DataTable
            noHeader
            pagination
            // paginationServer
            subHeader={true}
            columns={columnsTable}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            // paginationDefaultPage={currentPage}
            // paginationComponent={CustomPagination}
            // data={paginateArray(newDataTable)}
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[10,25,50,100]}
            data={newDataTable}
            noDataComponent='No hay registros para mostrar'
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
                showSelectStatus={showSelectStatus}
                showButtonAdd={showButtonAdd}
                showButtonAddInstitution={showButtonAddInstitution}
                componentButton={componentButton}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default DataTableList