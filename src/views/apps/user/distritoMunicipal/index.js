import { columns } from './columns'

import DataTableList from '../../../../@core/components/table'

import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const DistritoMunicipal = () => (
  <DataTableList
    columnsTable={columns}
    dataTable={null}
    dataTableTitle="Distrito Municipal"
    showButtonAdd
  />
)

export default DistritoMunicipal
