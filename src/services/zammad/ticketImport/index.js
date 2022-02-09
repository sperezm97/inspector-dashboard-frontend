import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { addAllGroupsToUser } from "../../../utility/Utils";
import { getInfoCedula } from "../../cedula";
import { getGroups, postGroup } from "../group";
import { getOrganizationByAcronym, postOrganization } from "../organization";
import { getUserByCedula, postUser } from "../user";

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketImport = async (dataCsv, objAddCsv) => {

    let dataCreateTicket = {}
    let groupData = {}
    let idUserCiudadano = null
    let idInstitucion = null
    const arrIncidente = dataCsv.incidente.split(',')
    const lengthIncidente = arrIncidente.length - 1

    try {
        // organization and group
        const organizationData = await getOrganizationByAcronym(dataCsv.institucion)
        groupData = await getGroups()
        const findGroup = groupData.data.find(group => group.acronimo.toUpperCase() === dataCsv.institucion.toUpperCase())
        if(organizationData.data[0] && findGroup) {
            idInstitucion = findGroup.id

        }else if(organizationData.data[0] && !findGroup){
            const requestGroup = await postGroup({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})
            idInstitucion = requestGroup.data.id
        
        }else if(!organizationData.data[0] && findGroup){
            const requestOrganization = await postOrganization({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})
            idInstitucion = requestOrganization.data.id

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
            const requestUpdateUser = await putUser({id: userCedula.data[0].id, group_ids: addAllGroupsToUser(groupData)})
            idUserCiudadano = requestUpdateUser.data.id
        }else {
            const infoCedulaCiudadano = await getInfoCedula(dataCsv.ciudadano_id)
            const objZammad = {
                cedula: infoCedulaCiudadano.data.payload.id,
                firstname: infoCedulaCiudadano.data.payload.names,
                lastname: `${infoCedulaCiudadano.data.payload.firstSurname} ${infoCedulaCiudadano.data.payload.secondSurname}`,
                zone: dataCsv.reporte_zona_id,
                organization_id: idInstitucion,
                phone: dataCsv.ciudadano_telefono || '',
                note: 'User created from the BackOffice (Ticket Import)',
                group_ids: addAllGroupsToUser(groupData)
            }
            const requestUser = await postUser(objZammad)
            idUserCiudadano = requestUser.data.id
        }
        
        // ticket
        dataCreateTicket = {
            customer_id: idUserCiudadano,
            title: `${arrIncidente[lengthIncidente] || ''} en ${dataCsv.reporte_direccion}`,
            group_id: idInstitucion,
            owner_id: parseInt(objAddCsv.owner_id),
            address: dataCsv.reporte_direccion,
            state_id: parseInt(objAddCsv.state_id),
            priority_id: parseInt(objAddCsv.priority_id),
            zone: dataCsv.reporte_zona_id,
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