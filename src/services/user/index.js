import { zammadAxios } from "../../configs/axios"
import { zammadApi } from "../../constants/api/zammadApi"

export const postUser = async (dataObj) => {
    let dataPost = []
    let loading = false
    let error = false

    try {
        loading = true
        dataPost = await zammadAxios.post(zammadApi.users, dataObj)
    } catch (err) {
        console.log(err)
        error = true
    } finally {
        loading = false
    }

    return { dataPost, loading, error }
}