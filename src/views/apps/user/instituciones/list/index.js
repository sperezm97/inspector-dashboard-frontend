import { columns } from './columns'

import DataTableList from '../../../../../@core/components/table'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Instituciones = () => (
  <DataTableList
    columnsTable={columns}
    dataTable={null}
    dataTableTitle="Instituciones"
    showButtonAddInstitution
  />
)

export default Instituciones
