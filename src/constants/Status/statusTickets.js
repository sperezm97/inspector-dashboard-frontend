export const New = {id: 1, value: 'new', label: 'Nuevo'}
export const Open = {id: 2, value: 'open', label: 'Abierto'}
export const PendingReminder = {id: 3, value: 'pendingReminder', label: 'Pendiente Recordatorio'}
export const Closed = {id: 4, value: 'closed', label: 'Cerrado'}
export const Merged = {id: 5, value: 'merged', label: 'Fusionado'}
export const InProgress = {id: 6, value: 'inProgress', label: 'En Progreso'}
export const PendingClose = {id: 7, value: 'pendingClose', label: 'Pendiente Cerrar'}
export const Undefined = {id: 8, value: 'undefined', label: 'Indefinido'}

export const statusTicketsObj = {
  new: {
    id: 'new',
    label: 'Nuevo',
    color: '#3498DB',
  },
  open: {
    id: 'open',
    label: 'Abierto',
    color: '#5ECB08',
  },
  pendingReminder: {
    id: 'pendingReminder',
    label: 'Pendiente Recordatorio',
  },
  closed: {
    id: 'closed',
    label: 'Cerrado',
    color: '#CFCFCF',
  },
  merged: {
    id: 'merged',
    label: 'Fusionado',
  },
  inProgress: {
    id: 'inProgress',
    label: 'En Progreso',
  },
  pendingClose: {
    id: 'pendingClose',
    label: 'Pendiente Cerrar',
  },
  undefined: {
    id: 'undefined',
    label: 'Indefinido',
    color: '#000',
  },
}

export const statusTicketsArray = [
  New,
  Open,
  PendingReminder,
  Closed,
  Merged,
  InProgress,
  PendingClose,
]
