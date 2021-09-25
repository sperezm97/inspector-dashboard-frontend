import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import BreadCrumbs from '@components/breadcrumbs'
import WizardModern from './WizardModern'
import WizardVertical from './WizardVertical'
import WizardHorizontal from './WizardHorizontal'
import WizardModernVertical from './WizardModernVertical'

const Wizard = () => (
  <>
    <BreadCrumbs
      breadCrumbTitle="Form Wizard"
      breadCrumbParent="Form"
      breadCrumbActive="Form Wizard"
    />
    <Row>
      <Col sm="12">
        <WizardHorizontal />
      </Col>
      <Col sm="12">
        <WizardVertical />
      </Col>
      <Col sm="12">
        <WizardModern />
      </Col>
      <Col sm="12">
        <WizardModernVertical />
      </Col>
    </Row>
  </>
)
export default Wizard
