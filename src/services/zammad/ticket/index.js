import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { getUserByCedula, getUserMe, putUser } from "../user";

export const putUpdateStatusTicket = async (dataObj) => await zammadAxios.put(`${zammadApi.tickets}/${dataObj.id}`, dataObj)

export const getAllTickets = async () => await zammadAxios.get(zammadApi.allTickets)

export const getTicketById = async (id) => await zammadAxios.get(zammadApi.ticketById(id))

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketValidateUser = (dataObj) => {

    let idUserMe = null

    return getUserMe()
        .then(res => {
            if(res.status === 200){
                idUserMe = res.data.id                
                getUserByCedula(dataObj.cedula)
                    .then((res) => {
                        if(res.data[0]) {
                            const dataUserUpdate = {
                                id: res.data[0].id,
                                phone: dataObj.telefono,
                                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}`
                            }
                            putUser(dataUserUpdate)
                                .then(async (res) => {
                                    const dataCreateTicket = {
                                        customer_id: res.data.id,
                                        title: `${dataObj?.subCategoria.label} en ${dataObj.direccion}`,
                                        group_id: dataObj.institucion,
                                        owner_id: idUserMe,
                                        state_id: 1,
                                        address: dataObj.direccion,
                                        zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}${dataObj.seccion}${dataObj.barrio}${dataObj.subBarrio}`,
                                        article: {
                                            subject: null,
                                            body: dataObj.descripcion,
                                            type: 'note',
                                            attachments: []
                                        }
                                    }
                                    return postTicket(dataCreateTicket)
                                })
                                .catch(err => console.log('2', err))                               
                        }
                    })
                    .catch(err => console.log('1', err))
            }
        })
        .catch(err => console.log('0', err))
}