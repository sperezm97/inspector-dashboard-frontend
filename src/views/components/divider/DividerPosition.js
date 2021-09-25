import { Fragment } from 'react'

const DividerPosition = () => (
  <>
    <div className="divider divider-left">
      <div className="divider-text">Left</div>
    </div>

    <div className="divider divider-left-center">
      <div className="divider-text">Left Center</div>
    </div>

    <div className="divider">
      <div className="divider-text">Center(Default)</div>
    </div>

    <div className="divider divider-right-center">
      <div className="divider-text">Right Center</div>
    </div>

    <div className="divider divider-right">
      <div className="divider-text">Right</div>
    </div>
  </>
)
export default DividerPosition
