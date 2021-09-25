// ** Invoice Add Components
import { Row, Col } from 'reactstrap'
import AddCard from './AddCard'
import AddActions from './AddActions'

// ** Third Party Components

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const InvoiceAdd = () => (
  <div className="invoice-add-wrapper">
    <Row className="invoice-add">
      <Col xl={9} md={8} sm={12}>
        <AddCard />
      </Col>
      <Col xl={3} md={4} sm={12}>
        <AddActions />
      </Col>
    </Row>
  </div>
)

export default InvoiceAdd
