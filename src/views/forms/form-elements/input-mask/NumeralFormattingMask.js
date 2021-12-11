import { Fragment } from 'react'
import Cleave from 'cleave.js/react'

const NumeralFormattingMask = function() {
  const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

  return (
    <>
      <label htmlFor="numeral-formatting">Numeral Formatting</label>
      <Cleave
        className="form-control"
        placeholder="10,000"
        options={options}
        id="numeral-formatting"
      />
    </>
  )
}

export default NumeralFormattingMask
