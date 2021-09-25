import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import BreadCrumbs from '@components/breadcrumbs'
import BasicTimeline from './BasicTimeline'
import IconsTimeline from './IconsTimeline'

const Timeline = () => (
  <>
    <BreadCrumbs
      breadCrumbTitle="Timeline"
      breadCrumbParent="Extra Components"
      breadCrumbActive="Timeline"
    />
    <Row>
      <Col lg="6">
        <BasicTimeline />
      </Col>
      <Col lg="6">
        <IconsTimeline />
      </Col>
    </Row>
  </>
)

export default Timeline
