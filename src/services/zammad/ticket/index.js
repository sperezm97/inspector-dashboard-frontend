import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { getUserByCedula, getUserMe, putUser } from "../user";

export const putUpdateStatusTicket = async (dataObj) => await zammadAxios.put(`${zammadApi.tickets}/${dataObj.id}`, dataObj)

export const getAllTickets = async () => await zammadAxios.get(zammadApi.allTickets)

export const getTicketById = async (id) => await zammadAxios.get(zammadApi.ticketById(id))

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketValidateUser = async (dataObj, previewArr) => {

    let idUserMe = null
    let dataCreateTicket = {}
    let dataUserUpdate = {}

    try {
        const user = await getUserMe()
        idUserMe = await user.data.id
        const userCedula = await getUserByCedula(dataObj.cedula)
        if(userCedula.data[0]) {
            dataUserUpdate = {
                id: userCedula.data[0].id,
                phone: dataObj.telefono,
                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}`
            }
            const updateUser = await putUser(dataUserUpdate)
            dataCreateTicket = {
                customer_id: updateUser.data.id,
                title: `${dataObj?.subCategoria.label} en ${dataObj.direccion}`,
                group_id: dataObj.institucion,
                owner_id: idUserMe,
                state_id: 1,
                address: dataObj.direccion,
                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}${dataObj.seccion}${dataObj.barrio}${dataObj.subBarrio}`,
                article: {
                    subject: '',
                    body: dataObj.descripcion,
                    type: 'note',
                    attachments: previewArr
                }
            }
        }
 
        //else if - if there is not user
 
        const postTicketAsy = await postTicket(dataCreateTicket)

        return postTicketAsy
        
    } catch (error) {
        console.log('error: ', error)
        
        return error
    }

}