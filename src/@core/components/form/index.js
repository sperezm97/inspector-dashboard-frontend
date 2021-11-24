import React, { memo } from 'react'

import {
    Row,
    Form,
    Col,
    Button,
  } from 'reactstrap'

const FormApp = ({ handleSubmit, onSubmit, children }) => (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>

            { children }

            <Col sm="12" className="mt-2">
                <Button
                    type="submit"
                    color="primary"
                    className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                >
                    Crear
                </Button>
                <Button 
                    type="reset" 
                    color="primary" 
                    outline
                >
                    Limpiar
                </Button>
            </Col>
        </Row>
    </Form>
)

export default memo(FormApp)