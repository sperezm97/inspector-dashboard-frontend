export const strapiApi = {
  auth: {
    login: "/auth/local",
  },
  beneficiaries: {
    beneficiarie: 'beneficiaries',
    beneficiarieId: (id) => `beneficiaries/${id}`,
  },
  users: {
    user: 'users',
    userId: (id) => `users/${id}`,
  },
  tickets: {
    ticket: 'tickets',
    ticketId: (id) => `tickets/${id}`,
  },
  institutions: {
    institution: 'institutions',
  },
  services: {
    all: 'services',
    service: 'services?filters[type][$eq]=service',
    category: 'services?filters[type][$eq]=category',
    subCategory: 'services?filters[type][$eq]=subcategory',
  }
}
