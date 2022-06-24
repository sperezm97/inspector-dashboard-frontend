import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetBeneficiaries = async () => await strapiAxios.get(strapiApi.beneficiaries.beneficiary)

export const strapiPostBeneficiary = async (data) => await strapiAxios.post(strapiApi.beneficiaries.beneficiary, data)

export const strapiPutBeneficiary = async (id, data) => await strapiAxios.put(strapiApi.beneficiaries.beneficiaryId(id), data)

export const strapiGetBeneficiariesByCedula = async (id) => await strapiAxios.get(strapiApi.beneficiaries.beneficiaryByCedula(id))
