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
    idN: 1,
    id: 'new',
    label: 'Nuevo',
    color: '#3498DB',
  },
  open: {
    idN: 2,
    id: 'open',
    label: 'Abierto',
    color: '#5ECB08',
  },
  pendingReminder: {
    idN: 3,
    id: 'pendingReminder',
    label: 'Pendiente Recordatorio',
  },
  closed: {
    idN: 4,
    id: 'closed',
    label: 'Cerrado',
    color: '#CFCFCF',
  },
  merged: {
    idN: 5,
    id: 'merged',
    label: 'Fusionado',
  },
  inProgress: {
    idN: 6,
    id: 'inProgress',
    label: 'En Progreso',
  },
  pendingClose: {
    idN: 7,
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
