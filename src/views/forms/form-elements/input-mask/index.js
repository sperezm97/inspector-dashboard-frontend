import { Fragment } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col, Card, CardBody, CardTitle, CardHeader } from 'reactstrap'
import PhoneMask from './PhoneMask'
import DateMask from './DateMask'
import TimeMask from './TimeMask'
import BlocksMask from './BlocksMask'
import PrefixMask from './PrefixMask'
import DelimitersMask from './DelimitersMask'
import CreditCardMask from './CreditCardMask'
import CustomDelimitersMask from './CustomDelimitersMask'
import NumeralFormattingMask from './NumeralFormattingMask'

const InputMask = () => (
  <>
    <Breadcrumbs
      breadCrumbTitle="Input Mask"
      breadCrumbParent="Form Elements"
      breadCrumbActive="Input Mask"
    />
    <Row>
      <Col sm="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Input Masks</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <CreditCardMask />
              </Col>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <PhoneMask />
              </Col>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <DateMask />
              </Col>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <TimeMask />
              </Col>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <NumeralFormattingMask />
              </Col>
              <Col className="mb-2" xl="4" md="6" sm="12">
                <BlocksMask />
              </Col>
              <Col xl="4" md="6" sm="12">
                <DelimitersMask />
              </Col>
              <Col xl="4" md="6" sm="12">
                <CustomDelimitersMask />
              </Col>
              <Col xl="4" md="6" sm="12">
                <PrefixMask />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </>
)
export default InputMask
