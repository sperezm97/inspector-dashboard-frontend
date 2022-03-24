import { addAllGroupsToUser } from "../../../utility/Utils";
import { getInfoCedula } from "../../cedula";
import { getGroups, postGroup } from "../group";
import { getOrganizations, postOrganization } from "../organization";
import { getUserByCedula, postUser, putUser} from "../user";

export const postUserImport = async (dataCsv) => {
    
    let groupData = {}
    let organizationData = {}
    let idInstitucion = null

    console.log('groupData', groupData)

    const findGroup = (nameInstitucion) => groupData.find(group => group.acronimo.toUpperCase() === nameInstitucion.toUpperCase())
    const findOrganization = (nameInstitucion) => organizationData.find(organization => organization.acronimo.toUpperCase() === nameInstitucion.toUpperCase())

    try {
        // organization and group
        organizationData = await (await getOrganizations()).data
        groupData = await (await getGroups()).data
        const findedGroup = findGroup(dataCsv.institucion)
        const findedOrganization = findOrganization(dataCsv.institucion)
        console.log("findedOrganization", findedOrganization)
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
        const userCedula = await getUserByCedula(dataCsv.cedula)
        if(userCedula.data[0]) {
            const newRols = [...new Set(userCedula.data[0].role_ids, 2, 3)]
            const requestUpdateUser = await putUser({
                id: userCedula.data[0].id, 
                group_ids: addAllGroupsToUser(groupData),
                organization: findedOrganization.id,
                organization_id: findedOrganization.id,
                role_ids: newRols,
                phone: dataCsv.telefono || '',
                zone: dataCsv.zona_id,
            })
        
            console.log('requestUpdateUser', requestUpdateUser)
            return requestUpdateUser

        }
            const infoCedulaCiudadano = await getInfoCedula(dataCsv.cedula)
            const objZammad = {
                cedula: infoCedulaCiudadano.data.payload.id,
                firstname: infoCedulaCiudadano.data.payload.names,
                lastname: `${infoCedulaCiudadano.data.payload.firstSurname} ${infoCedulaCiudadano.data.payload.secondSurname}`,
                email: dataCsv.correo,
                login: dataCsv.correo,
                password: dataCsv.cedula,
                zone: dataCsv.zona_id,
                organization: findedOrganization.id,
                organization_id: findedOrganization.id,
                phone: dataCsv.telefono || '',
                role_ids: [2, 3],
                note: 'User created from the BackOffice (User Import)',
                group_ids: addAllGroupsToUser(groupData)
            }
            const requestUser = await postUser(objZammad)

            console.log('requestUser', requestUser)
            return requestUser
        
        
    } catch (error) {
        console.log('error: ', error.message)
        
        return error
    }

}