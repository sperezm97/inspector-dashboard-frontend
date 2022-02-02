import { Col, Card, CardBody, Row } from 'reactstrap'
import { DragDrop } from '@uppy/react'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

export var DropFile = function({uppy}) {
  return <Row>
            <Col sm="12">
                <DragDrop uppy={uppy} />
            </Col>
        </Row>
}