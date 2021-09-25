import { Slack, User, Settings, Database, Edit2 } from 'react-feather'

export const Admin = 'Admin'
export const Presidencial = 'Presidencial'
export const Institucion = 'Institución'
export const Reportero = 'Reportero'
export const Ciudadano = 'Ciudadano'

export const rolArray = [Admin, Presidencial, Institucion, Reportero, Ciudadano]

export const rolObj = {
  admin: {
    name: Admin,
    icon: User,
    classText: 'text-primary',
  },
  presidencial: {
    name: Presidencial,
    icon: Slack,
    classText: 'text-primary',
  },
  institucion: {
    name: Institucion,
    icon: Database,
    classText: 'text-primary',
  },
  reportero: {
    name: Reportero,
    icon: Settings,
    classText: 'text-warning',
  },
  ciudadano: {
    name: Ciudadano,
    icon: Edit2,
    classText: 'text-primary',
  },
}
