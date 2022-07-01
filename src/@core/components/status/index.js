import { statusTicketsObj } from '../../../constants/Status/statusTickets'
import {
  Badge,
} from 'reactstrap'

export const statusTickets = (status) => {

    const changeColorLabel = () => {
        switch (status) {
            // case statusTicketsObj.new.id:
            case 'new':
                return statusTicketsObj.new

            // case statusTicketsObj.open.id:
            case 'open':
                return statusTicketsObj.open

            // case statusTicketsObj.pendingReminder.id:
            case "pending_reminder":
                return statusTicketsObj.pendingReminder

            // case statusTicketsObj.closed.id:
            case "closed":
                return statusTicketsObj.closed

            // case statusTicketsObj.merged.id:
            case "merged":
                return statusTicketsObj.merged

            // case statusTicketsObj.inProgress.id:
            case "removed":
                return statusTicketsObj.inProgress
            
            default: 
                return null
        }
    }

    const sytleStatus = {
        width: '10px',
        height: '10px',
        borderRadius: '2px',
        display: 'inline-block',
        marginRight: '7px',
        background: changeColorLabel()?.color
    }

    return (
        <>
            <span 
                style={sytleStatus}    
            />
            <span className="text-truncate">{changeColorLabel()?.label}</span>
        </>
    )
}

export const statusPriority = (statusId) => {
    switch (statusId) {
        case 'low':
            return <Badge color="light-success">Baja</Badge>

        case 'normal':
            return <Badge color="light-warning">Normal</Badge>

        case 'high':
            return <Badge color="light-danger">Alta</Badge>

        default:
            return <Badge color="light-primary">Desconocida</Badge>
    }
}