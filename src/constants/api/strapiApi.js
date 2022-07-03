const ticketPopulate = "?pagination[page]=1&fields[0]=title&fields[1]=address&fields[2]=description&fields[3]=state&fields[4]=priority&fields[5]=createdAt&&fields[6]=zone_code&sort[0]=publishedAt:desc&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula&populate[beneficiary][fields][0]=name&populate[beneficiary][fields][1]=cedula&populate[beneficiary][fields][2]=phone&populate[beneficiary][fields][3]=email&populate[institution][fields][0]=acronym&populate[institution][fields][1]=name&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id"
const ticketComments = "&populate[comments][populate][0]=attachments&populate[comments][populate][attachments][fields][0]=url&populate[comments][populate][attachments][fields][1]=name&populate[comments][populate][attachments][fields][1]=mime"
const ticketOwner = "&populate[comments][populate][owner][fields][1]=firstname&populate[comments][populate][owner][fields][2]=lastname&populate[comments][populate][owner][fields][2]=cedula"

export const strapiApi = {
  auth: {
    login: "/auth/local",
  },
  dashboard: {
    total: "tickets",
    open: "tickets?filters[state][$eq]=open",
    end: "tickets?filters[state][$eq]=closed",
    notClose: "tickets?filters[state][$ne]=closed",
    priorityLow: "tickets?filters[priority][$eq]=low",
    priorityNormal: "tickets?filters[priority][$eq]=normal",
    priorityHigh: "tickets?filters[priority][$eq]=high",
    institutionWithTickets: "institutions?populate[tickets][fields]=id",
    usersActive: "users"
  },
  beneficiaries: {
    beneficiary: ({valueSearch=""}) => `beneficiaries?filters[cedula][$containsi]=${valueSearch}`,
    beneficiaryPost: `beneficiaries`,
    beneficiaryId: (id) => `beneficiaries/${id}`,
    beneficiaryByCedula: (id) => `beneficiaries?filters[cedula][$eq]=${id}`,
  },
  users: {
    userMe: 'users/me?populate[institution][fields]=name&populate[institution][fields]=acronym',
    user: ({valueSearch="", valueZone=""}) => `users?filters[cedula][$containsi]=${valueSearch}&filters[zone_code][$startsWith]=${valueZone}`,
    userPost: 'users',
    userId: (id) => `users/${id}?populate[institution][fields]=name&populate[institution][fields]=acronym`,
    userImport: "users/import"
  },
  tickets: {
    ticket: ({valueSearch="", valueZone=""}) => `tickets${ticketPopulate}&filters[title][$containsi]=${valueSearch}&filters[zone_code][$startsWith]=${valueZone}`,
    ticketPost: `tickets`,
    ticketId: (id) => `tickets/${id}${ticketPopulate}${ticketComments}${ticketOwner}`,
    ticketImport: "tickets/import",
  },
  institutions: {
    institution: ({valueSearch=""}) => `institutions?filters[name][$containsi]=${valueSearch}`,
    institutionPost: `institutions`,
    institutionId: (id) => `institutions/${id}?populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&populate[owner][fields][0]=firstname&populate[owner][fields][1]=lastname&populate[owner][fields][2]=cedula`,
    institutionByIdService: (idService) => `institutions?fields[0]=name&fields[1]=acronym&populate[services][fields][0]=name&populate[services][fields][1]=type&populate[services][fields][2]=id&filters[services][id][$eq]=${idService}`,
  },
  services: {
    all: 'services',
    serviceId: (id) => `services/${id}?fields[0]=name&fields[1]=type&populate[children][fields][0]=name&populate[children][fields][1]=type&populate[parent][fields][0]=name&populate[parent][fields][1]=type&sort[0]=publishedAt:asc`,
    service: ({valueSearch}) => `services?filters[type][$eq]=service&filters[name][$containsi]=${valueSearch}`,
    category: ({valueSearch}) => `services?filters[type][$eq]=category&filters[name][$containsi]=${valueSearch}`,
    subCategory: ({valueSearch}) => `services?filters[type][$eq]=subcategory&filters[name][$containsi]=${valueSearch}`,
  },
  comments: {
    comment: 'comments'
  },
  uploads: {
    upload: "upload"
  }
}
