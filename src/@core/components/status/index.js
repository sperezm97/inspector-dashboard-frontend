import { Abierto, EnProgreso, Finalizado } from "../../../constants/Status/statusTickets"
import {
  Badge,
} from 'reactstrap'

export const statusTickets = (status) => {

    const changeColor = () => {
        switch (status) {
            case EnProgreso:
                return "#3498DB"

            case Abierto:
                return "#5ECB08"

            case Finalizado:
                return "#CFCFCF"

            default: 
                return "#000"
        }
    }

    const sytleStatus = {
        width: '10px',
        height: '10px',
        borderRadius: '2px',
        display: 'inline-block',
        marginRight: '7px',
        background: changeColor()
    }

    return (
        <>
            <span 
                style={sytleStatus}    
            />
            <span className="text-truncate">{status}</span>
        </>
    )
}

export const statusPriority = (statusId) => {
    if(statusId === 1){
        return (
            <Badge color="light-success">Baja</Badge>
        )
    }else if(statusId === 2){
        return (
            <Badge color="light-warning">Normal</Badge>
        )
    }else if(statusId === 3){
        return (
            <Badge color="light-danger">Alta</Badge>
        )
    }else {
        return (
            <Badge color="light-primary">Desconocida</Badge>
        )
    }
}