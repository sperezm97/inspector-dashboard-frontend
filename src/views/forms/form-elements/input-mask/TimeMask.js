import { Fragment } from 'react'
import Cleave from 'cleave.js/react'

const TimeMask = () => {
  const options = { time: true, timePattern: ['h', 'm', 's'] }
  return (
    <>
      <label htmlFor="time">Time</label>
      <Cleave
        className="form-control"
        placeholder="12:00:00"
        options={options}
        id="time"
      />
    </>
  )
}

export default TimeMask
