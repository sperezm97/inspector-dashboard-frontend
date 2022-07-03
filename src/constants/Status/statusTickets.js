export const New = {id: 1, value: 'new', label: 'Nuevo'}
export const Open = {id: 2, value: 'open', label: 'Abierto'}
export const PendingReminder = {id: 3, value: 'pending_reminder', label: 'Pendiente Recordatorio'}
export const Closed = {id: 4, value: 'closed', label: 'Cerrado'}
export const Merged = {id: 5, value: 'merged', label: 'Fusionado'}
export const Removed = {id: 6, value: 'removed', label: 'Removido'}

export const statusTicketsObj = {
  new: {
    idN: 1,
    id: 'new',
    value: 'new',
    label: 'Nuevo',
    color: '#3498DB',
  },
  open: {
    idN: 2,
    id: 'open',
    value: 'open',
    label: 'Abierto',
    color: '#5ECB08',
  },
  pending_reminder: {
    idN: 3,
    id: 'pending_reminder',
    value: 'pending_reminder',
    label: 'Pendiente Recordatorio',
  },
  closed: {
    idN: 4,
    id: 'closed',
    value: 'closed',
    label: 'Cerrado',
    color: '#CFCFCF',
  },
  merged: {
    idN: 5,
    id: 'merged',
    value: 'merged',
    label: 'Fusionado',
  },
  removed: {
    idN: 6,
    id: 'removed',
    value: 'removed',
    label: 'En Progreso',
  },
}

export const statusTicketsArray = [
  New,
  Open,
  PendingReminder,
  Closed,
  Merged,
  Removed,
]
