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