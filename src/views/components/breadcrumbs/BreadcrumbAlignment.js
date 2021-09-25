import { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const BreadcrumbsAlignment = () => (
  <>
    <div className="d-flex justify-content-start breadcrumb-wrapper">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="#"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div className="d-flex justify-content-center breadcrumb-wrapper my-1">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="#"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div className="d-flex justify-content-end breadcrumb-wrapper">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="#"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> Library </Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="pr-1">
          <span> Data </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  </>
)
export default BreadcrumbsAlignment
