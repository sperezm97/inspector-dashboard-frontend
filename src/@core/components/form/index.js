import React from 'react'

import {
    Row,
    Form,
    Col,
    Button,
  } from 'reactstrap'

const FormApp = ({ handleSubmit, onSubmit, children, loading, edit }) => (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>

            { children }

            <Col sm="12" className="mt-2">
                <Button
                    type="submit"
                    color="primary"
                    className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                    disabled={loading}
                >
                    {edit 
                        ? loading ? 'Modificando...' : 'Modificar' 
                        : loading ? 'Creando...' : 'Crear'
                    }
                </Button>
                {!edit &&
                    <Button 
                        type="reset" 
                        color="primary" 
                        outline
                    >
                        Limpiar
                    </Button>
                }
            </Col>
        </Row>
    </Form>
)

export default FormApp