// ** React Imports
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Label, Input, CustomInput, Row, Col, Card, CardHeader, CardTitle } from 'reactstrap'

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store/actions'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonRipple } from '../button'
import Url from '../../../constants/Url'

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
          <div className='d-flex align-items-center mr-2'>
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
            </CustomInput>
          </div>
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

  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
  }, [dispatch, store.data.length])

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: val
      })
    )
  }

  const handlePerPage = e => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        status: statusValue,
        q: value
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
        q: value
      })
    )
  }

  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

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

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

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
            paginationServer
            subHeader={true}
            columns={columnsTable}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
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