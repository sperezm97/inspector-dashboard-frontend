import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const sweetAlert = ({title='', text='', type='error'}) => (
  MySwal.fire({
    title: title,
    text: text,
    icon: type,
    customClass: {
      confirmButton: 'btn btn-primary',
    },
    buttonsStyling: false,
  })
)

export const sweetAlertError = () => (
  MySwal.fire({
    title: 'Error',
    text: 'Ocurrió un error al procesar la solicitud',
    icon: 'error',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
    buttonsStyling: false,
  })
)

export const sweetAlertGood = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Proceso realizado correctamente'
  })
}