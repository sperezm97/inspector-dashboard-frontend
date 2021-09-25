// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Table Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../store/actions'
import { columns } from './columns'

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
}) => (
  <div className="invoice-list-table-header w-100 py-2">
    <Row>
      <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
        <div className="d-flex align-items-center mr-2">
          <Label for="rows-per-page">Mostrar</Label>
          <CustomInput
            className="form-control ml-50 pr-3"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ border: 'none' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </CustomInput>
        </div>
      </Col>
      <Col
        lg="6"
        className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0"
      >
        <div className="d-flex align-items-center">
          <Label for="search-invoice">Buscar</Label>
          <Input
            id="search-invoice"
            className="ml-50 mr-2 w-100"
            type="text"
            value={value}
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Buscar..."
          />
        </div>
        <Input
          className="w-auto pr-4"
          type="select"
          value={statusValue}
          onChange={handleStatusValue}
          style={{ border: 'none' }}
        >
          <option value="">Seleccionar Estado</option>
        </Input>
      </Col>
    </Row>
  </div>
)

const InvoiceList = () => {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.invoice)

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
        q: value,
      }),
    )
  }, [dispatch, store.data.length])

  const handleFilter = (val) => {
    setValue(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: val,
      }),
    )
  }

  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        status: statusValue,
        q: value,
      }),
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
        q: value,
      }),
    )
  }

  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        status: statusValue,
        q: value,
      }),
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        pageCount={count || 1}
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        activeClassName="active"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        nextLinkClassName="page-link"
        nextClassName="page-item next"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end p-1"
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value,
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    }
    if (store.data.length === 0 && isFiltered) {
      return []
    }
    return store.allData.slice(0, rowsPerPage)
  }

  console.log('dataTable', dataToRender())

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            subHeader
            columns={columns}
            responsive
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList
