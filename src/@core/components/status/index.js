import { statusTicketsObj } from '../../../constants/Status/statusTickets'
import {
  Badge,
} from 'reactstrap'

export const statusTickets = (status) => {

    const changeColorLabel = () => {
        switch (status) {
            // case statusTicketsObj.new.id:
            case 1:
                return statusTicketsObj.new

            // case statusTicketsObj.open.id:
            case 2:
                return statusTicketsObj.open

            // case statusTicketsObj.pendingReminder.id:
            case 3:
                return statusTicketsObj.pendingReminder

            // case statusTicketsObj.closed.id:
            case 4:
                return statusTicketsObj.closed

            // case statusTicketsObj.merged.id:
            case 5:
                return statusTicketsObj.merged

            // case statusTicketsObj.inProgress.id:
            case 6:
                return statusTicketsObj.inProgress

            // case statusTicketsObj.pendingClose.id:
            case 7:
                return statusTicketsObj.pendingClose
            
            default: 
                return statusTicketsObj.undefined
        }
    }

    const sytleStatus = {
        width: '10px',
        height: '10px',
        borderRadius: '2px',
        display: 'inline-block',
        marginRight: '7px',
        background: changeColorLabel().color
    }

    return (
        <>
            <span 
                style={sytleStatus}    
            />
            <span className="text-truncate">{changeColorLabel().label}</span>
        </>
    )
}

export const statusPriority = (statusId) => {
    switch (statusId) {
        case 1:
            return <Badge color="light-success">Baja</Badge>

        case 'normal':
            return <Badge color="light-warning">Normal</Badge>

        case 3:
            return <Badge color="light-danger">Alta</Badge>

        default:
            return <Badge color="light-primary">Desconocida</Badge>
    }
}