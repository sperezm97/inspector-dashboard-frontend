import React, { memo } from 'react'
import Select from 'react-select'
import { Controller } from "react-hook-form"

import { selectThemeColors, optionsZammadIdValueSelect } from '../../../utility/Utils'

import {
    Col,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap'
import { RequiredInput } from '../requiredInput'

const InputApp = ({ required, label, type="text", select=false, selectOptions=[], control, name, register, placeholder="", messageError="", defaultValue=null, disabled=false }) => (
    <Col lg="4" md="6" sm="12">
        <FormGroup>
            <Label>{label}{required && <RequiredInput />}</Label>
            {select 
                ?
                    <Controller
                        control={control}
                        name={name}
                        onChange={register}
                        defaultValue={{value: '', label: 'Sin Seleccionar'}}
                        render={({ onChange, value, name }) => (
                            <Select
                                name={name}
                                theme={selectThemeColors}
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={value}
                                isLoading={selectOptions[0] ? false : true}
                                options={optionsZammadIdValueSelect(selectOptions)}
                                onChange={onChange}
                            />
                        )}
                    />
                :
                    <Input
                        type={type}
                        name={name}
                        disabled={disabled}
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