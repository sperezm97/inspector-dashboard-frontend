import { Col, Card, CardBody, Row } from 'reactstrap'
import { DragDrop } from '@uppy/react'

import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'

export const DropFile = ({uppy}) => (
    <Col sm="12">
        <Card>
            <CardBody>
                <Row>
                    <Col sm="12">
                        <DragDrop uppy={uppy} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </Col>
)