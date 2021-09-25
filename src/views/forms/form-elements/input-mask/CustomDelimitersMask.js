import { Fragment } from 'react'
import Cleave from 'cleave.js/react'

const CustomDelimitersMask = () => {
  const options = {
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    uppercase: true,
  }
  return (
    <>
      <label htmlFor="custom-delimiters">Custom Delimiters</label>
      <Cleave
        className="form-control"
        placeholder="Delimiter: ['.', '.', '-']"
        options={options}
        id="custom-delimiters"
      />
    </>
  )
}

export default CustomDelimitersMask
