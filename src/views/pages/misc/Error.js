import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/error.svg'

import '@styles/base/pages/page-misc.scss'

const Error = () => (
  <div className="misc-wrapper">
    <div className="misc-inner p-2 p-sm-3">
      <div className="w-100 text-center">
        <h2 className="mb-1">Página No Encontrada ⚠️</h2>
        <p className="mb-2">URL/error no fue encontrado en este servidor.</p>
        <Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
          Volver al Inicio
        </Button>
        <img className="img-fluid" src={errorImg} alt="Página No Encontrada" />
      </div>
    </div>
  </div>
)
export default Error
