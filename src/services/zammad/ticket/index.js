import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { addAllGroupsToUser } from "../../../utility/Utils";
import { getGroups } from "../group";
import { getUserByCedula, getUserMe, postUser, putUser } from "../user";

export const putUpdateStatusTicket = async (dataObj) => await zammadAxios.put(`${zammadApi.tickets}/${dataObj.id}`, dataObj)

export const getAllTickets = async () => await zammadAxios.get(zammadApi.allTickets)

export const getTicketById = async (id) => await zammadAxios.get(zammadApi.ticketById(id))

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketValidateUser = async (dataObj, infoCedula, previewArr) => {

    let idUserMe = null
    let groupData = null
    let dataCreateTicket = {}
    let dataUserUpdate = {}
    let idUserCiudadano = null

    try {
        const user = await getUserMe()
        groupData = await (await getGroups()).data
        idUserMe = user.data.id
        const userCedula = await getUserByCedula(dataObj.cedula)
        if(userCedula.data[0]) {
            dataUserUpdate = {
                id: userCedula.data[0].id,
                phone: dataObj.telefono,
                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}`,
                note: 'User updated from the BackOffice (Ticket create)',
                group_ids: addAllGroupsToUser(groupData)
            }
            const updateUser = await putUser(dataUserUpdate)
            idUserCiudadano = updateUser.data.id 
            
        }else {
            const objUserZammad = {
                cedula: infoCedula.id,
                firstname: infoCedula.names,
                lastname: `${infoCedula.firstSurname} ${infoCedula.secondSurname}`,
                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}${dataObj.seccion}${dataObj.barrio.value}${dataObj.subBarrio && dataObj.subBarrio.value}`,
                phone: dataObj.telefono,
                role_ids: [2, 3],
                note: 'User created from the BackOffice (Ticket create)',
                group_ids: addAllGroupsToUser(groupData)
            }
            const requestUser = await postUser(objUserZammad)
            idUserCiudadano = requestUser.data.id
        }
 
        dataCreateTicket = {
            customer_id: idUserCiudadano,
            title: `${dataObj?.subCategoria.label} en ${dataObj.subBarrio ? dataObj.subBarrio.label : dataObj.barrio.label}`,
            group_id: dataObj.institucion,
            owner_id: idUserMe,
            state_id: 1,
            address: dataObj.direccion,
            zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}${dataObj.seccion}${dataObj.barrio.value}${dataObj.subBarrio && dataObj.subBarrio.value}`,
            article: {
                subject: '',
                body: dataObj.descripcion,
                type: 'note',
                attachments: previewArr
            }
        }
        const postTicketAsy = await postTicket(dataCreateTicket)

        return postTicketAsy
        
    } catch (error) {
        console.log('error: ', error)
        
        return error
    }

}