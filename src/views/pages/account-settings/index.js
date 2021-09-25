import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import Tabs from './Tabs'
import InfoTabContent from './InfoTabContent'
import SocialTabContent from './SocialTabContent'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import NotificationsTabContent from './NotificationsTabContent'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('1')
  const [data, setData] = useState(null)

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    axios
      .get('/account-setting/data')
      .then((response) => setData(response.data))
  }, [])

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Account Settings"
        breadCrumbParent="Pages"
        breadCrumbActive="Account Settings"
      />
      {data !== null ? (
        <Row>
          <Col className="mb-2 mb-md-0" md="3">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <GeneralTabContent data={data.general} />
                  </TabPane>
                  <TabPane tabId="2">
                    <PasswordTabContent />
                  </TabPane>
                  <TabPane tabId="3">
                    <InfoTabContent data={data.info} />
                  </TabPane>
                  <TabPane tabId="4">
                    <SocialTabContent data={data.social} />
                  </TabPane>
                  <TabPane tabId="5">
                    <NotificationsTabContent data={data.notification} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </>
  )
}

export default AccountSettings
