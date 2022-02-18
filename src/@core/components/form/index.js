import React from 'react'

import {
    Row,
    Form,
    Col,
    Button,
    Spinner
  } from 'reactstrap'

const FormApp = ({ handleSubmit, onSubmit, children, loading, edit=false }) => (
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
                    {loading && <Spinner color='white' size='sm' />}
                    <span className={`${loading && 'ml-50'}`}>
                        {edit 
                            ? loading ? 'Modificando...' : 'Modificar' 
                            : loading ? 'Creando...' : 'Crear'
                        }
                    </span>
                </Button>
                {/* {!edit &&
                    <Button 
                        type="reset" 
                        color="primary" 
                        outline
                    >
                        Limpiar
                    </Button>
                } */}
            </Col>
        </Row>
    </Form>
)

export default FormApp