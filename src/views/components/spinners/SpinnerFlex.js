import { Fragment } from 'react'
import { Spinner } from 'reactstrap'

const SpinnerFlex = () => (
  <>
    <div className="d-flex justify-content-center my-1">
      <Spinner />
    </div>

    <div className="d-flex justify-content-between align-items-center">
      <strong>Loading...</strong>
      <Spinner />
    </div>
  </>
)
export default SpinnerFlex
