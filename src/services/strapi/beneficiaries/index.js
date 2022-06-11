import { strapiAxios } from '../../../configs/axios'
import { strapiApi } from '../../../constants/api/strapiApi'

export const strapiGetBeneficiaries = async () => await strapiAxios.get(strapiApi.beneficiaries.beneficiarie)
