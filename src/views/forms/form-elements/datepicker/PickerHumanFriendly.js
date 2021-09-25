import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerHumanFriendly = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <>
      <Label for="hf-picker">Human Friendly</Label>
      <Flatpickr
        value={picker}
        id="hf-picker"
        className="form-control"
        onChange={(date) => setPicker(date)}
        options={{
          altInput: true,
          altFormat: 'F j, Y',
          dateFormat: 'Y-m-d',
        }}
      />
    </>
  )
}

export default PickerHumanFriendly
