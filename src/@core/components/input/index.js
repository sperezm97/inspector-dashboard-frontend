import React, { memo } from 'react'

import {
    Col,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap'

const InputApp = ({ label, type="text", name, register, placeholder="", messageError="", defaultValue=null }) => (
    <Col lg="4" md="6" sm="12">
        <FormGroup>
            <Label for="name">{label}</Label>
            <Input
                type={type}
                name={name}
                innerRef={register()}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
            <p className="text-danger">{messageError}</p>
        </FormGroup>
    </Col>
)

export default memo(InputApp)