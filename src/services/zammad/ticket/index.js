import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { getUserByCedula, getUserMe, putUser } from "../user";

export const putUpdateStatusTicket = async (dataObj) => await zammadAxios.put(`${zammadApi.tickets}/${dataObj.id}`, dataObj)

export const getAllTickets = async () => await zammadAxios.get(zammadApi.allTickets)

export const getTicketById = async (id) => await zammadAxios.get(zammadApi.ticketById(id))

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const postTicketValidateUser = (dataObj, previewArr) => {

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
                                            subject: '',
                                            body: dataObj.descripcion,
                                            type: 'note',
                                            attachments: previewArr
                                        }
                                    }
                                    return postTicket(dataCreateTicket)
                                            .then(res => console.log(res))
                                            .catch(err => console.log('3 el error: ', err))
                                })
                                .catch(err => console.log('2 el error: ', err))                               
                        }
                    })
                    .catch(err => console.log('1 el error: ', err))
            }
        })
        .catch(err => console.log('0 el error: ', err))
}