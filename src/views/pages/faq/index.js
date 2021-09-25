import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

import '@styles/base/pages/page-faq.scss'

const Faq = () => {
  const [data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const getFAQData = (query) =>
    axios.get('/faq/data', { params: { q: query } }).then((response) => {
      setData(response.data)
    })

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="FAQ"
        breadCrumbParent="Pages"
        breadCrumbActive="FAQ"
      />
      <FaqFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getFAQData={getFAQData}
      />
      {data !== null ? (
        <Faqs
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : null}
      <FaqContact />
    </>
  )
}

export default Faq
