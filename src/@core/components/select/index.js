import { Controller } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import Select from 'react-select'

import { RequiredInput } from "../requiredInput"
import { selectThemeColors } from "../../../utility/Utils"

const SelectApp = ({label= "", notRequired, control, name, onChange, optionsRender, value, error}) => {

    return (
        <FormGroup>
            <Label>{label}{!notRequired && <RequiredInput />}</Label>
                <Controller
                    control={control}
                    name={name}
                    render={({field}) => <Select 
                            {...field}
                            onChange={(e) => onChange(e)}
                            options={optionsRender}
                            isLoading={!optionsRender[0]}
                            value={value}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            loadingMessage={() => "No hay datos para mostrar"}
                        />}
                    />
                <p className="text-danger">{error && error}</p>
        </FormGroup>
    )
}

export default SelectApp