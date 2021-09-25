import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
import Validations from './Validation'

const ReactstrapValidation = () => (
  <>
    <Breadcrumbs
      breadCrumbTitle="Reactstrap Validation"
      breadCrumbParent="Form"
      breadCrumbActive="Reactstrap Validation"
    />
    <Row>
      <Col sm="12">
        <Validations />
      </Col>
    </Row>
  </>
)
export default ReactstrapValidation
