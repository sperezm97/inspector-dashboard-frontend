import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Row, Col, Alert } from 'reactstrap'

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
import { getTicketsTags } from '../../../../services/zammad/ticketTags'

const InvoicePreview = function() {

  const { id } = useParams()

  const [dataTicketArticles, setDataTicketArticles] = useState(null)
  const [dataTicketTags, setDataTicketTags] = useState(null)
  const [dataTicket, setDataTicket] = useState(null)
  const [dataUserMe, setDataUserMe] = useState(null)
  const [dataUserOwner, setDataUserOwner] = useState(null)
  const [dataUserCustomer, setDataUserCustomer] = useState(null)
  
  const [msg, setMsg] = useState('')
  const [ previewArr, setPreviewArr ] = useState([])
  const [ previewUpload, setPreviewUpload ] = useState([])

  const [loadingPost, setLoadingPost] = useState(false)

  const handleGetTicketArticles = () => {
    getTicketArticles(id)
      .then(res => setDataTicketArticles(res.data))
      .catch(err => console.log(err.response))
  }

  const handlePostTicketArticles = (dataObj) => {
    setLoadingPost(true)
    postTicketArticles(dataObj)
      .then(res => {
        handleGetTicketArticles()
        sweetAlertGood()
        setMsg('')
        setPreviewArr([])
        setPreviewUpload([])
        console.log(res)
      })
      .catch(err => sweetAlertError())
      .finally(() => setLoadingPost(false))
  }

  useEffect(() => {

    handleGetTicketArticles()

    getTicketById(id)
      .then(res => setDataTicket(res.data))
      .catch(err => console.log(err.response))

    getUserMe()
      .then(res => setDataUserMe(res.data))
      .catch(err => console.log(err.response))

    getTicketsTags(id)
      .then(res => setDataTicketTags(res.data))
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
            loadingPost={loadingPost}
            msg={msg}
            setMsg={setMsg}
            previewArr={previewArr}
            setPreviewArr={setPreviewArr}
            previewUpload={previewUpload} 
            setPreviewUpload={setPreviewUpload}
          />
        </Col>
        <Col xl={5} md={5} sm={12}>
          <CardProfile
            dataTicket={dataTicket}
            dataUserOwner={dataUserOwner}
            dataTicketTags={dataTicketTags.tags}
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
