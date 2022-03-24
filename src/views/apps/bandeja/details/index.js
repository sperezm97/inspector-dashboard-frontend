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
import { destructZone } from '../../../../utility/Utils'
import { getDistrictByIdentifier, getMunicipalityByIdentifier, getNeighborhoodByIdentifier, getProvinceByIdentifier, getRegionByIdentifier, getSectionByIdentifier, getSubNeighborhoodByIdentifier } from '../../../../services/territories/identifier'

const InvoicePreview = function() {

  const { id } = useParams()

  const [dataTicketArticles, setDataTicketArticles] = useState(null)
  const [dataTicketTags, setDataTicketTags] = useState(null)
  const [dataTicket, setDataTicket] = useState(null)
  const [dataUserMe, setDataUserMe] = useState(null)
  const [dataUserOwner, setDataUserOwner] = useState(null)
  const [dataUserCustomer, setDataUserCustomer] = useState(null)

  const [zonesState, setZonesState] = useState(null)
  console.log("zonesState", zonesState)
  
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

      const zones = destructZone(dataTicket?.zone)
      console.log("zones", zones)
      getRegionByIdentifier(zones?.region)
        .then(res => {
          setZonesState({region: res.data.data.name})
          
          getProvinceByIdentifier(zones?.province)
            .then(res => {
              setZonesState((zonesState) => ({...zonesState, province: res.data.data.name}))
              
              getMunicipalityByIdentifier(zones?.municipality)
                .then(res => {
                  setZonesState((zonesState) => ({...zonesState, municipality: res.data.data.name}))
                  
                  getDistrictByIdentifier(zones?.district)
                    .then(res => {
                      setZonesState((zonesState) => ({...zonesState, district: res.data.data.name}))
                      
                      getSectionByIdentifier(zones?.section)
                        .then(res => {
                          setZonesState((zonesState) => ({...zonesState, section: res.data.data.name}))
                      
                          getNeighborhoodByIdentifier(zones?.neighborhood)
                            .then(res => {
                              setZonesState((zonesState) => ({...zonesState, neighborhood: res.data.data.name}))
                              
                              getSubNeighborhoodByIdentifier(zones?.subNeighborhood)
                                .then(res => {
                                  setZonesState((zonesState) => ({...zonesState, subNeighborhood: res.data.data.name}))
                                })
                            })
                        })
                    })
                })
            })
        })

    }
  }, [dataTicket])

  return (dataTicketArticles && dataUserMe && dataTicket) ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col sm={12}>
          {dataUserCustomer &&
            <CardContact 
              dataUserCustomer={dataUserCustomer}
            />
          }
        </Col>
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
            zonesState={zonesState}
          />
          {/* <CardUserInfo /> */}
        </Col>
      </Row>
    </div>
  ) : (
    <ComponentSpinner />
  )
}

export default InvoicePreview
