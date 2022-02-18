import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Label, Input, Row, Col, Card, CardHeader, CardTitle } from 'reactstrap'

import { ExportButtons } from '../../../../@core/components/export-buttons'
import { ButtonRipple } from '../../../../@core/components/button'
import Url from '../../../../constants/Url'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = function({
  handleFilter,
  value,
  newDataTable,
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
          <Row>
            <Col sm="12" md="6">
              <ExportButtons newDataTable={newDataTable} />
            </Col>
            <Col sm="12" md="6">
              {/* import button */}
            </Col>
          </Row>
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
  searchTable,
  showButtonAddUser = false,
  showButtonAddInstitution = false,
  showButtonAddReport = false,
  showButton = false,
  labelButton = '',
  urlButton = '',
  dataTableTitle = '',
}) {
  const [newDataTable, setNewDataTable] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    setNewDataTable(dataTable.reverse())
  }, [dataTable])


  const handleFilter = (val) => {
    setValue(val)

    const queryLowered = val.toLowerCase()

    const filteredData = searchTable(dataTable, queryLowered)

    setNewDataTable(filteredData)
  }

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    // selectAllRowsItem: true,
    // selectAllRowsItemText: 'Todos',
  }

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
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationComponentOptions={paginationComponentOptions}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            data={newDataTable}
            noDataComponent="No hay registros para mostrar"
            progressPending={!dataTable[0]}
            progressComponent="Cargando..."
            subHeaderComponent={
              <CustomHeader
                value={value}
                newDataTable={newDataTable}
                handleFilter={handleFilter}
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
