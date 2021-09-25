import { Fragment } from 'react'
import { Button, UncontrolledTooltip } from 'reactstrap'

const TooltipUncontrolled = () => (
  <>
    <Button color="primary" id="UnControlledExample">
      Uncontrolled
    </Button>
    <UncontrolledTooltip placement="top" target="UnControlledExample">
      Hello World !
    </UncontrolledTooltip>
  </>
)
export default TooltipUncontrolled
