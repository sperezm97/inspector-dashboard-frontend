import React, { memo } from 'react'

import { selectThemeColors, optionsZammadIdValueSelect } from '../../../utility/Utils'
import Select from 'react-select'

import {
    Col,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap'

const InputApp = ({ label, type="text", select=false, selectOptions=[], name, register, placeholder="", messageError="", defaultValue=null }) => (
    <Col lg="4" md="6" sm="12">
        <FormGroup>
            <Label>{label}</Label>
            {select 
                ?
                    <Select
                        theme={selectThemeColors}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        value={{value: '', label: 'Sin Seleccionar'}}
                        options={optionsZammadIdValueSelect(selectOptions)}
                        onChange={register()}
                    />
                :
                    <Input
                        type={type}
                        name={name}
                        innerRef={register()}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                    />
            }
            <p className="text-danger">{messageError}</p>
        </FormGroup>
    </Col>
)

export default memo(InputApp)