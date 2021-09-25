import Nouislider from 'nouislider-react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const SliderLimit = ({ direction }) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">Limit</CardTitle>
    </CardHeader>
    <CardBody className="text-center">
      <Nouislider
        start={[40, 60]}
        direction={direction}
        orientation="vertical"
        limit={40}
        behaviour="drag"
        connect
        range={{
          min: 0,
          max: 100,
        }}
        style={{
          height: '200px',
        }}
      />
    </CardBody>
  </Card>
)

export default SliderLimit
