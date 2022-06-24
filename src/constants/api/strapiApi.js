export const strapiApi = {
  auth: {
    login: "/auth/local",
  },
  beneficiaries: {
    beneficiary: 'beneficiaries',
    beneficiaryId: (id) => `beneficiaries/${id}`,
    beneficiaryByCedula: (id) => `beneficiaries?filters[cedula][$eq]=${id}`,
  },
  users: {
    userMe: 'users/me',
    user: 'users',
    userId: (id) => `users/${id}`,
  },
  tickets: {
    ticket: 'tickets',
    ticketId: (id) => `tickets/${id}`,
  },
  institutions: {
    institution: 'institutions',
    institutionByIdService: (idService) => `institutions?fields[0]=name&fields[1]=acronym&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&filters[services][id][$eq]=${idService}`,
  },
  services: {
    all: 'services',
    serviceId: (id) => `services/${id}?fields[0]=name&fields[1]=type&populate[children][fields][0]=name&populate[children][fields][1]=type&populate[parent][fields][0]=name&populate[parent][fields][1]=type&sort[0]=publishedAt:asc`,
    service: 'services?filters[type][$eq]=service',
    category: 'services?filters[type][$eq]=category',
    subCategory: 'services?filters[type][$eq]=subcategory',
  }
}
