// ** Table Columns

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import { data, basicColumns } from '../data'

const DataTablesBasic = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Zero Configuration</CardTitle>
    </CardHeader>
    <DataTable
      noHeader
      pagination
      data={data}
      columns={basicColumns}
      className="react-dataTable"
      sortIcon={<ChevronDown size={10} />}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
    />
  </Card>
)

export default DataTablesBasic
