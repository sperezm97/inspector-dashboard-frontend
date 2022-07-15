import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetBeneficiaries = async ({valueSearch, pageNumber}) => await strapiAxios.get(strapiApi.beneficiaries.beneficiary({valueSearch, pageNumber}))

export const strapiPostBeneficiary = async (data) => await strapiAxios.post(strapiApi.beneficiaries.beneficiaryPost, data)

export const strapiPutBeneficiary = async (id, data) => await strapiAxios.put(strapiApi.beneficiaries.beneficiaryId(id), data)

export const strapiGetBeneficiariesByCedula = async (id) => await strapiAxios.get(strapiApi.beneficiaries.beneficiaryByCedula(id))
