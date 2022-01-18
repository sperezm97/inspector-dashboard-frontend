import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";
import { getUserByCedula, getUserMe, putUser } from "../user";

export const putUpdateStatusTicket = async (dataObj) => await zammadAxios.put(`${zammadApi.tickets}/${dataObj.id}`, dataObj)

export const postTicket = async (dataObj) => await zammadAxios.post(zammadApi.tickets, dataObj)

export const getTicketById = async (id) => await zammadAxios.get(zammadApi.ticketById(id))

export const postTicketValidateUser = async (dataObj) => {

    let idUserMe = null

    getUserMe()
        .then(res => {
            console.log('0', res)
            if(res.status === 200){
                idUserMe = res.data.id                
                getUserByCedula(dataObj.cedula)
                    .then((res) => {
                        console.log('1', res)
                        if(res.data[0]) {
                            const dataUserUpdate = {
                                id: res.data[0].id,
                                phone: dataObj.telefono,
                                zone: `${dataObj.region}${dataObj.provincia}${dataObj.municipio}${dataObj.distrito}`
                            }
                            putUser(dataUserUpdate)
                                .then((res) => {
                                    console.log('2', res)
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
                                        // tags: dataObj?.subCategoria.value,
                                    }
                                    console.log('dataCreateTicket', dataCreateTicket)
                                    postTicket(dataCreateTicket)
                                })
                                .catch(err => console.log('2', err))                               
                        }
                    })
                    .catch(err => console.log('1', err))
            }
        })
        .catch(err => console.log('0', err))
}