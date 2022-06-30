import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { CheckCircle, Users, FileText, BookOpen } from 'react-feather'
import { filterByStatusTickets } from '../../../utility/Utils'
import { statusTicketsObj } from '../../../constants/Status/statusTickets'

export const dataInfoChart = ({totalTickets, openTickets, endTickets, usersActive}) => {
  const { colors } = useContext(ThemeColors)

  return [
    {
      icon: <FileText size={21} />,
      color: 'danger',
      colorHEX: colors.danger.main,
      quantity: totalTickets || '0',
      title: 'Total de Casos',
    },
    {
      icon: <BookOpen size={21} />,
      color: 'warning',
      colorHEX: colors.warning.main,
      quantity: openTickets || '0',
      title: 'Casos Abiertos',
    },
    {
      icon: <CheckCircle size={21} />,
      color: 'secondary',
      colorHEX: colors.secondary.main,
      quantity: endTickets || '0',
      title: 'Casos Finalizados',
    },
    {
      icon: <Users size={21} />,
      color: 'primary',
      colorHEX: colors.primary.main,
      quantity: usersActive || '0',
      title: 'Reporteros Activos',
    },
  ]
}
