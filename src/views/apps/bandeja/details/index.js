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
import { getTicketArticles, postTicketArticles } from '../../../../services/zammad/ticketArticles'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'
import { getUserById, getUserMe } from '../../../../services/zammad/user'
import { getTicketById } from '../../../../services/zammad/ticket'
import { sweetAlertError, sweetAlertGood } from '../../../../@core/components/sweetAlert'

const InvoicePreview = function() {
  // ** Vars
  const { id } = useParams()

  const [dataTicketArticles, setDataTicketArticles] = useState(null)
  const [dataTicket, setDataTicket] = useState(null)
  const [dataUserMe, setDataUserMe] = useState(null)
  const [dataUserOwner, setDataUserOwner] = useState(null)
  const [dataUserCustomer, setDataUserCustomer] = useState(null)

  const handleGetTicketArticles = () => {
    getTicketArticles(id)
      .then(res => setDataTicketArticles(res.data))
      .catch(err => console.log(err.response))
  }

  const handlePostTicketArticles = (dataObj) => {
    postTicketArticles(dataObj)
      .then(res => {
        handleGetTicketArticles()
        sweetAlertGood()
        console.log(res)
      })
      .catch(err => sweetAlertError())
  }

  useEffect(() => {

    handleGetTicketArticles()

    getTicketById(id)
      .then(res => setDataTicket(res.data))
      .catch(err => console.log(err.response))

    getUserMe()
      .then(res => setDataUserMe(res.data))
      .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    if(dataTicket){
      getUserById(dataTicket.owner_id)
        .then(res => setDataUserOwner(res.data))
        .catch(err => console.log(err.response))

      getUserById(dataTicket.customer_id)
        .then(res => setDataUserCustomer(res.data))
        .catch(err => console.log(err.response))
    }
  }, [dataTicket])

  return (dataTicketArticles && dataUserMe && dataTicket) ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={7} md={7} sm={12}>
          <CardChat 
            dataTicketArticles={dataTicketArticles}
            dataTicketId={id}
            dataUserMe={dataUserMe}
            handlePostTicketArticles={handlePostTicketArticles}
          />
        </Col>
        <Col xl={5} md={5} sm={12}>
          <CardProfile
            dataTicket={dataTicket}
            dataUserOwner={dataUserOwner}
          />
          {/* <CardUserInfo /> */}
          {dataUserCustomer &&
            <CardContact 
              dataUserCustomer={dataUserCustomer}
            />
          }
        </Col>
      </Row>
    </div>
  ) : (
    <ComponentSpinner />
  )
}

export default InvoicePreview
