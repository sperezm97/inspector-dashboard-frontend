import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerInline = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <>
      <Label for="inline-picker">Inline</Label>
      <Flatpickr
        className="form-control"
        value={picker}
        options={{ inline: true }}
        onChange={(date) => setPicker(date)}
      />
    </>
  )
}

export default PickerInline
