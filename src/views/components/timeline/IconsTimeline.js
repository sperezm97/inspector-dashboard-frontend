import Timeline from '@components/timeline'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { iconsData } from './data'

const IconsTimeline = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Icons</CardTitle>
    </CardHeader>
    <CardBody>
      <Timeline data={iconsData} />
    </CardBody>
  </Card>
)

export default IconsTimeline
