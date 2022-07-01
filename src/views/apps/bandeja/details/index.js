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
import { strapiGetTicketsById } from '../../../../services/strapi/tickets'
import { strapiGetUserMe } from '../../../../services/strapi/users'
import { strapiPostComments } from '../../../../services/strapi/comments'
import { strapiPostUploads } from '../../../../services/strapi/uploads'

const InvoicePreview = function () {

  const { id } = useParams()

  const [dataTicketArticles, setDataTicketArticles] = useState(null)
  const [dataTicketTags, setDataTicketTags] = useState(null)
  const [dataTicket, setDataTicket] = useState(null)
  const [dataUserMe, setDataUserMe] = useState(null)
  const [dataUserOwner, setDataUserOwner] = useState(null)
  const [dataUserCustomer, setDataUserCustomer] = useState(null)

  const [zonesState, setZonesState] = useState(null)

  const [msg, setMsg] = useState('')
  const [previewArr, setPreviewArr] = useState([])
  const [previewUpload, setPreviewUpload] = useState([])

  const [loadingPost, setLoadingPost] = useState(false)
  const [executeGet, setExecuteGet] = useState(true)

  const handleGetTicketArticles = () => {
    // getTicketArticles(id)
    //   .then(res => setDataTicketArticles(res.data))
    //   .catch(err => console.log(err.response))

    strapiGetTicketsById(id)
      .then(res => setDataTicket(res.data.data))
      .catch(err => console.log(err))
  }

  const handlePostTicketArticles = (dataObj) => {
    setExecuteGet(false)
    setLoadingPost(true)

    if (previewArr[0]) {
      const formData = new FormData();

      for (let i = 0; i < previewArr.length; i++) {
        formData.append("files", previewArr[i].files)
      }

      strapiPostUploads(formData)
        .then(res => {
          const arrIdImage = res.data.map(item => item.id)
          console.log("arrIdImage", arrIdImage)

          const objComment = {
            data: {
              message: dataObj.data.message,
              ticket: dataTicket.id,
              owner: dataObj.data.owner,
              attachments: arrIdImage,
              internal: true,
              content_type: "text/plain"
            }
          }

          strapiPostComments(objComment)
            .then(res => {
              handleGetTicketArticles()
              sweetAlertGood()
              setMsg('')
              setPreviewArr([])
              setPreviewUpload([])
              console.log(res)
            })
            .catch(() => sweetAlertError())

        })
        .catch(() => sweetAlertError())
        .finally(() => setLoadingPost(false))

    } else {
      strapiPostComments(dataObj)
        .then(res => {
          handleGetTicketArticles()
          sweetAlertGood()
          setMsg('')
          setPreviewArr([])
          setPreviewUpload([])
          console.log(res)
        })
        .catch(() => sweetAlertError())
        .finally(() => setLoadingPost(false))
    }

  }

  useEffect(() => {
    //
    //

    handleGetTicketArticles()

    // getTicketById(id)
    //   .then(res => setDataTicket(res.data))
    //   .catch(err => console.log(err.response))

    strapiGetUserMe()
      .then(res => setDataUserMe(res.data))
      .catch(err => console.log(err.response))

    getTicketsTags(id)
      .then(res => setDataTicketTags(res.data))
      .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    if (dataTicket && executeGet) {
      getUserById(dataTicket.owner_id)
        .then(res => setDataUserOwner(res.data))
        .catch(err => console.log(err.response))

      getUserById(dataTicket.customer_id)
        .then(res => setDataUserCustomer(res.data))
        .catch(err => console.log(err.response))

      const zones = destructZone(dataTicket?.attributes?.zone_code)
      console.log("zones", zones)
      getRegionByIdentifier(zones?.region)
        .then(res => {
          setZonesState({ region: res.data.data.name })

          getProvinceByIdentifier(zones?.province)
            .then(res => {
              setZonesState((zonesState) => ({ ...zonesState, province: res.data.data.name }))

              getMunicipalityByIdentifier(zones?.municipality)
                .then(res => {
                  setZonesState((zonesState) => ({ ...zonesState, municipality: res.data.data.name }))

                  getDistrictByIdentifier(zones?.district)
                    .then(res => {
                      setZonesState((zonesState) => ({ ...zonesState, district: res.data.data.name }))

                      getSectionByIdentifier(zones?.section)
                        .then(res => {
                          setZonesState((zonesState) => ({ ...zonesState, section: res.data.data.name }))

                          getNeighborhoodByIdentifier(zones?.neighborhood)
                            .then(res => {
                              setZonesState((zonesState) => ({ ...zonesState, neighborhood: res.data.data.name }))

                              getSubNeighborhoodByIdentifier(zones?.subNeighborhood)
                                .then(res => {
                                  setZonesState((zonesState) => ({ ...zonesState, subNeighborhood: res.data.data.name }))
                                })
                            })
                        })
                    })
                })
            })
        })

    }
  }, [dataTicket])

  return (dataTicket) ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col sm={12}>
          {dataTicket &&
            <CardContact
              dataTicket={dataTicket}
            />
          }
        </Col>
        <Col xl={7} md={7} sm={12}>
          <CardChat
            dataTicket={dataTicket}
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
