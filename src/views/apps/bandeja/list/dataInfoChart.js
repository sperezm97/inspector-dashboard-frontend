import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { CheckCircle, Users, FileText, BookOpen } from 'react-feather'

export const dataInfoChart = () => {
  const { colors } = useContext(ThemeColors)

  return [
    {
      icon: <FileText size={21} />,
      color: 'danger',
      colorHEX: colors.danger.main,
      quantity: 9876,
      title: 'Total de Casos',
    },
    {
      icon: <BookOpen size={21} />,
      color: 'warning',
      colorHEX: colors.warning.main,
      quantity: 9876,
      title: 'Casos Abiertos',
    },
    {
      icon: <CheckCircle size={21} />,
      color: 'secondary',
      colorHEX: colors.secondary.main,
      quantity: 9876,
      title: 'Casos Finalizados',
    },
    {
      icon: <Users size={21} />,
      color: 'primary',
      colorHEX: colors.primary.main,
      quantity: 9876,
      title: 'Reporteros Activos',
    },
  ]
}
