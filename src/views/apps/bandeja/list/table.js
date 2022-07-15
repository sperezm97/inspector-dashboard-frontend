import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Label, Input, Row, Col, Card, CardHeader, CardTitle } from 'reactstrap'

import ReactPaginate from 'react-paginate'
import { ExportButtons } from '../../../../@core/components/export-buttons'
import { ButtonRipple } from '../../../../@core/components/button'
import Url from '../../../../constants/Url'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = function({
  // handleFilter,
  // value,
  setValueSearch,
  dataTable,
  showButtonAddUser,
  showButtonAddInstitution,
  showButtonAddReport,
  showButton,
  labelButton,
  urlButton,
}) {
  const history = useHistory()

  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          {/* <Row>
            <Col sm="12" md="6">
              <ExportButtons dataTable={dataTable} />
            </Col>
            <Col sm="12" md="6">
              import button
            </Col>
          </Row> */}
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
              // value={value}
              onChange={(e) => setValueSearch(e.target.value)}
              placeholder="Escribe..."
            />
          </div>

          {showButtonAddUser && (
            <ButtonRipple
              label="Añadir Nuevo Usuario"
              onClick={() => history.push(Url.userCreate)}
            />
          )}
          {showButtonAddInstitution && (
            <ButtonRipple
              label="Añadir Nueva Institución"
              onClick={() => history.push(Url.institutionCreate)}
            />
          )}
          {showButtonAddReport && (
            <ButtonRipple
              label="Añadir Nuevo Ticket"
              onClick={() => history.push(Url.dashboardInboxCreate)}
            />
          )}
          {showButton && (
            <ButtonRipple
              label={labelButton}
              onClick={() => history.push(urlButton)}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

const DataTableList = function({
  columnsTable,
  dataTable,
  setValueSearch,
  setPageNumber,
  // searchTable,
  showButtonAddUser = false,
  showButtonAddInstitution = false,
  showButtonAddReport = false,
  showButton = false,
  labelButton = '',
  urlButton = '',
  dataTableTitle = '',
  loadingTable=true
}) {

  console.log("dataTable", dataTable)

  const [currentPage, setCurrentPage] = useState(0)
  console.log(currentPage)
  
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // const CustomPagination = function() {
  //   return <ReactPaginate
  //       previousLabel=""
  //       nextLabel=""
  //       forcePage={currentPage}
  //       onPageChange={(page) => handlePagination(page)}
  //       pageCount={dataTable?.meta?.pagination?.pageCount}
  //       breakLabel="..."
  //       pageRangeDisplayed={2}
  //       marginPagesDisplayed={2}
  //       activeClassName="active"
  //       pageClassName="page-item"
  //       breakClassName="page-item"
  //       breakLinkClassName="page-link"
  //       nextLinkClassName="page-link"
  //       nextClassName="page-item next"
  //       previousClassName="page-item prev"
  //       previousLinkClassName="page-link"
  //       pageLinkClassName="page-link"
  //       breakClassName="page-item"
  //       breakLinkClassName="page-link"
  //       containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
  //     />
  // }

  // const [newDataTable, setNewDataTable] = useState([])
  // const [value, setValue] = useState('')

  // useEffect(() => {
  //   setNewDataTable(dataTable)
  // }, [dataTable])


  // const handleFilter = (val) => {
  //   setValue(val)

  //   const queryLowered = val.toLowerCase()

    // const filteredData = searchTable(dataTable, queryLowered)

  //   setNewDataTable(filteredData)
  // }

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    // selectAllRowsItem: true,
    // selectAllRowsItemText: 'Todos',
  }

  const handlePerRowsChange = (newPerPage, page) => {
    console.log("newPerPage", newPerPage)
    console.log("page", page)
  };

  const handlePageChange = page => {
		console.log("handlePageChange ", page);
    if(dataTable?.meta?.pagination?.total){
      setPageNumber(page)
    }
	};

  return (
    <div className="invoice-list-wrapper">
      <Card>
        {dataTableTitle && (
          <CardHeader>
            <CardTitle tag="h4">{dataTableTitle}</CardTitle>
          </CardHeader>
        )}
        <div className="invoice-list-dataTable">
          <DataTable
            noHeader
            pagination
            subHeader
            columns={columnsTable}
            responsive
            // sortIcon={<ChevronDown />}
            className="react-dataTable"
            // defaultSortField="invoiceId"
            paginationServer={!!dataTable?.data}
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[10]}
            paginationPerPage={10}
            data={dataTable?.data ? dataTable?.data : dataTable}
            noDataComponent="No hay registros para mostrar"
            progressPending={loadingTable}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationTotalRows={dataTable?.meta?.pagination?.total}
            onChangePage={handlePageChange}
            // paginationComponent={dataTable.data ? CustomPagination : null}
            progressComponent="Cargando..."
            subHeaderComponent={
              <CustomHeader
                // value={value}
                dataTable={dataTable}
                setValueSearch={setValueSearch}
                // handleFilter={handleFilter}
                showButtonAddUser={showButtonAddUser}
                showButtonAddInstitution={showButtonAddInstitution}
                showButtonAddReport={showButtonAddReport}
                showButton={showButton}
                labelButton={labelButton}
                urlButton={urlButton}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default DataTableList
