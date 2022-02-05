import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { getInfoCedula } from "../../cedula";
import { postGroup } from "../group";
import { getOrganizationByAcronym, postOrganization } from "../organization";
import { getUserByCedula, postUser } from "../user";

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketImport = async (dataCsv, objAddCsv) => {

    let dataCreateTicket = {}
    let idUserCiudadano = null
    let idInstitucion = null
    const arrIncidente = dataCsv.incidente.split(',')
    const lengthIncidente = arrIncidente.length - 1

    try {
        // organization and group
        const organizationData = await getOrganizationByAcronym(dataCsv.institucion)
        if(organizationData.data[0]) {
            idInstitucion = organizationData.data[0].id
        }else {
            const requestOrganization = await postOrganization({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})
            if(requestOrganization.status === 201){
                const requestGroup = await postGroup({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})
                idInstitucion = requestGroup.data.id
            }
        }

        // user
        const userCedula = await getUserByCedula(dataCsv.ciudadano_id)
        if(userCedula.data[0]) {
            idUserCiudadano = userCedula.data[0].id
        }else {
            const infoCedulaCiudadano = await getInfoCedula(dataCsv.ciudadano_id)
            const objZammad = {
                cedula: infoCedulaCiudadano.data.payload.id,
                firstname: infoCedulaCiudadano.data.payload.names,
                lastname: `${infoCedulaCiudadano.data.payload.firstSurname} ${infoCedulaCiudadano.data.payload.secondSurname}`,
                zone: dataCsv.reporte_zona_id,
                organization_id: idInstitucion,
                phone: dataCsv.ciudadano_telefono || '',
            }
            const requestUser = await postUser(objZammad)
            idUserCiudadano = requestUser.data.id
        }
        
        // ticket
        dataCreateTicket = {
            group_id: idInstitucion,
            customer_id: idUserCiudadano,
            owner_id: objAddCsv.owner_id,
            zone: dataCsv.reporte_zona_id,
            address: dataCsv.reporte_direccion,
            title: `${arrIncidente[lengthIncidente] || ''} en ${dataCsv.reporte_direccion}`,
            state_id: objAddCsv.state_id,
            priority_id: objAddCsv.priority_id,
            article: {
                subject: '',
                body: dataCsv.comentario,
                type: 'note',
                attachments: []
            }
        }
        const postTicketAsy = await postTicket(dataCreateTicket)
        return postTicketAsy
        
    } catch (error) {
        console.log('error: ', error.message)
        
        return error
    }

}