import { Fragment } from 'react'

const DividerStyle = () => (
  <>
    <div className="divider divider-dotted">
      <div className="divider-text">Dotted</div>
    </div>

    <div className="divider divider-dashed">
      <div className="divider-text">Dashed</div>
    </div>

    <div className="divider">
      <div className="divider-text">Solid</div>
    </div>
  </>
)
export default DividerStyle
