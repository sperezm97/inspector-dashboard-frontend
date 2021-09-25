import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import CardChat from './CardChat'
import CardProfile from './CardProfile'
import CardUserInfo from './CardUserInfo'
import CardContact from './CardContact'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)

  // ** Get invoice on mount based on id
  useEffect(() => {
    axios.get(`/api/invoice/invoices/5036`).then((response) => {
      setData(response.data)
    })
  }, [])

  return data !== null && data.invoice !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={7} md={7} sm={12}>
          <CardChat />
        </Col>
        <Col xl={5} md={5} sm={12}>
          <CardProfile />
          <CardUserInfo />
          <CardContact />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Institución no encontrada</h4>
    </Alert>
  )
}

export default InvoicePreview
