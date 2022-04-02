import { zammadAxios } from "../../../configs/axios";
import { zammadApi } from "../../../constants/api/zammadApi";

export const postTags = async (name) => await zammadAxios.post(zammadApi.postTags, name)

export const getTagsByName = async (name) => await zammadAxios.get(zammadApi.tagsByName(name))
