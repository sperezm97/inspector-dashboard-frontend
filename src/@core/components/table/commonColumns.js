import { Link } from 'react-router-dom'

import { Edit2 } from 'react-feather'
import { rolObj } from '../../../constants/Rol/rol'
import Url from '../../../constants/Url'

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
  } from 'reactstrap'
  import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

import Avatar from '@components/avatar'

const renderClient = row => {
    const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

    if (row?.avatar?.length) {
    return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
    } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={row.reporterFirstName ? row.reporterFirstName : 'X'} initials />
    }
}

export const rowClient = (row) => (
    row &&
        <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row)}
            <div className='d-flex flex-column'>
                <Link
                    to={`${Url.user}/${row.reporterId}`}
                    className='user-name text-truncate mb-0'
                >
                    <span className='font-weight-bold'>{row.reporterFirstName ? `${row.reporterFirstName} ${row.reporterLastName}` : ''}</span>
                </Link>
                <small className='text-truncate text-muted mb-0' style={{marginTop: '4px'}}>{row.reporterCedula && row.reporterCedula}</small>
            </div>
        </div>
)

export const rowInstitution = row => (
    row &&
        <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
                <Link
                    to={`${Url.institution}/${row.institutionId}`}
                    className='user-name text-truncate mb-0'
                >
                    <span className='font-weight-bold'>{row.institutionAcronym ? row.institutionAcronym : 'No definido'}</span>
                </Link>
                <small className='text-muted mb-0' style={{marginTop: '4px'}}>
                    {row.institutionName ? row.institutionName : 'No definido'}
                </small>
            </div>
        </div>
)

export const rowActions = rowId => (
    <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem
                tag={Link}
                to={`${Url.dashboardInbox}/${rowId}`}
                className="w-100"
                >
                <FileText size={14} className="mr-50" />
                <span className="align-middle">Detalles</span>
            </DropdownItem>
            <DropdownItem
                tag={Link}
                to={`/apps/user/edit/${rowId}`}
                className="w-100"
                >
                <Archive size={14} className="mr-50" />
                <span className="align-middle">Editar</span>
            </DropdownItem>
            <DropdownItem className="w-100">
                <Trash2 size={14} className="mr-50" />
                <span className="align-middle">Borrar</span>
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
)

export const iconRoleTable = rol => {

    const Icon = rolObj[rol] ? rolObj[rol].icon : Edit2
  
    return (
      <span className='text-truncate text-capitalize align-middle'>
        <Icon size={18} className={`${rolObj[rol] && rolObj[rol].classText } mr-50`} />
        {rol ? rol : 'No Definido'}
      </span>
    )
}