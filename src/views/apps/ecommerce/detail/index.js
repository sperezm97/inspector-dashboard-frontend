// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import BreadCrumbs from '@components/breadcrumbs'
import { Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

// ** Custom Components

// ** Third Party Components

// ** Store & Actions
import {
  getProduct,
  deleteWishlistItem,
  addToWishlist,
  addToCart,
} from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const params = useParams().product
  const productId = params.substring(params.lastIndexOf('-') + 1)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId))
  }, [])

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="Product Details"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Details"
      />
      <div className="app-ecommerce-details">
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            <CardBody>
              <RelatedProducts />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </>
  )
}

export default Details
