import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerDateTime = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <>
      <Label for="date-time-picker">Date & Time</Label>
      <Flatpickr
        value={picker}
        data-enable-time
        id="date-time-picker"
        className="form-control"
        onChange={(date) => setPicker(date)}
      />
    </>
  )
}

export default PickerDateTime
