// ** React Imports
import { useState } from 'react'

// ** Columns

// ** Third Party Components
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Row, Col } from 'reactstrap'
import { columns } from './columns'

import DataTableList from '../../../../@core/components/table'
import CardGrid from '../../../../@core/components/card-grid'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UsersList = () => {
  // ** States
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Seleccionar Provincia',
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Seleccionar Municipio',
    number: 0,
  })
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Seleccionar Rol',
  })

  // ** User filter options
  const planOptions = [
    { value: '', label: 'Seleccionar Provincia' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' },
  ]

  const statusOptions = [
    { value: '', label: 'Seleccionar Municipio', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 },
  ]

  const roleOptions = [
    { value: '', label: 'Seleccionar Rol' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' },
  ]

  return (
    <>
      <CardGrid cardHeaderTitle="Búsqueda con filtro">
        <Row>
          <Col className="my-md-0 my-1" md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={planOptions}
              value={currentPlan}
            />
          </Col>
          <Col md="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              value={currentStatus}
            />
          </Col>
          <Col md="4">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={currentRole}
            />
          </Col>
        </Row>
      </CardGrid>

      <DataTableList columnsTable={columns} dataTable={null} showButtonAdd />
    </>
  )
}

export default UsersList
