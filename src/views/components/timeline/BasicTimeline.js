import Timeline from '@components/timeline'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { basicData } from './data'

const BasicTimeline = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Basic</CardTitle>
    </CardHeader>
    <CardBody>
      <Timeline data={basicData} />
    </CardBody>
  </Card>
)

export default BasicTimeline
