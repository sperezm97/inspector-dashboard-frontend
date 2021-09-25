import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import PricingFaqs from './PricingFaqs'
import PricingCards from './PricingCards'
import PricingTrial from './PricingTrial'
import PricingHeader from './PricingHeader'

import '@styles/base/pages/page-pricing.scss'

const Pricing = () => {
  const [data, setData] = useState(null)
  const [faq, setFaq] = useState(null)
  const [duration, setDuration] = useState('monthly')

  useEffect(() => {
    axios.get('/pricing/data').then((res) => {
      const dataArr = []
      const faqArr = []

      Object.entries(res.data).forEach(([key, val]) => {
        if (key !== 'qandA') {
          dataArr.push(val)
          setData([...dataArr])
        } else {
          faqArr.push(val)
          setFaq(faqArr[0])
        }
      })
    })
  }, [])

  return (
    <div id="pricing-table">
      <PricingHeader duration={duration} setDuration={setDuration} />
      {data !== null && faq !== null ? (
        <>
          <PricingCards data={data} duration={duration} />
          <PricingTrial />
          <PricingFaqs data={faq} />
        </>
      ) : null}
    </div>
  )
}

export default Pricing
