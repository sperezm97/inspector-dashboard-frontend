import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { addAllGroupsToUser } from "../../../utility/Utils";
import { getInfoCedula } from "../../cedula";
import { getGroups, postGroup } from "../group";
import { getOrganizationByAcronym, getOrganizations, postOrganization } from "../organization";
import { postTicketArrTags } from "../ticketTags";
import { getUserByCedula, postUser, putUser } from "../user";

export const postTicketImportOG = async (dataOG) => {

    await postOrganization({name: dataOG, acronimo: dataOG})
    await postGroup({name: dataOG, acronimo: dataOG})
}

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketImport = async (dataCsv, objAddCsv) => {
    
    let dataCreateTicket = {}
    let groupData = {}
    let organizationData = {}
    let idUserCiudadano = null
    let idInstitucion = null
    const arrIncidente = dataCsv?.incidente?.split(',') || ""
    const lengthIncidente = arrIncidente.length - 1

    const findGroup = (nameInstitucion) => groupData.find(group => group.acronimo.toUpperCase() === nameInstitucion.toUpperCase())
    const findOrganization = (nameInstitucion) => organizationData.find(organization => organization.acronimo.toUpperCase() === nameInstitucion.toUpperCase())

    try {
        // organization and group
        // const organizationDataAsync = await getOrganizationByAcronym(dataCsv.institucion)
        organizationData = await (await getOrganizations()).data
        groupData = await (await getGroups()).data
        const findedGroup = findGroup(dataCsv.institucion)
        const findedOrganization = findOrganization(dataCsv.institucion)
        if(findedOrganization && findedGroup) {
            idInstitucion = findedGroup.id

        }else if(findedOrganization && !findedGroup){
            const requestGroup = await (await postGroup({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})).data
            groupData = { ...groupData, requestGroup}
            idInstitucion = requestGroup.id
        
        }else if(!findedOrganization && findedGroup){
            const requestOrganization = await (await postOrganization({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})).data
            organizationData = { ...organizationData, requestOrganization}
            idInstitucion = findedGroup.id

        }else {
            const requestOrganization = await (await postOrganization({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})).data
            organizationData = { ...organizationData, requestOrganization}
            console.log('requestOrganization', requestOrganization);
            if(requestOrganization.status === 201){
                const requestGroup = await (await postGroup({name: dataCsv.institucion.toUpperCase(), acronimo: dataCsv.institucion.toUpperCase()})).data
                groupData = { ...groupData, requestGroup}
                idInstitucion = requestGroup.id
            }
        }

        // user
        const userCedula = await getUserByCedula(dataCsv.ciudadano_id)
        if(userCedula.data[0]) {
            const newRols = [...new Set(userCedula.data[0].role_ids, 2, 3)]
            const requestUpdateUser = await putUser({
                id: userCedula.data[0].id, 
                group_ids: addAllGroupsToUser(groupData),
                organization_id: findedOrganization.id,
                organization: findedOrganization.id,
                role_ids: newRols
            })
            idUserCiudadano = requestUpdateUser.data.id
            await putUser({
                id: parseInt(objAddCsv.owner_id), 
                group_ids: addAllGroupsToUser(groupData),
            })
        }else {
            const infoCedulaCiudadano = await getInfoCedula(dataCsv.ciudadano_id)
            const objZammad = {
                cedula: infoCedulaCiudadano.data.payload.id,
                firstname: infoCedulaCiudadano.data.payload.names,
                lastname: `${infoCedulaCiudadano.data.payload.firstSurname} ${infoCedulaCiudadano.data.payload.secondSurname}`,
                zone: dataCsv.reporte_zona_id,
                organization_id: findedOrganization.id,
                organization: findedOrganization.id,
                phone: dataCsv.ciudadano_telefono || '',
                role_ids: [2, 3],
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
                body: dataCsv.comentario || "",
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