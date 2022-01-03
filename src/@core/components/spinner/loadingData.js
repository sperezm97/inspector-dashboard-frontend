import { Spinner } from 'reactstrap'

const LoadingData = ({size= ''}) => {
    return (
        <Spinner
            color="primary"
            size={size}
            // type="grow"
        />
    )
  }
  
  export default LoadingData
  