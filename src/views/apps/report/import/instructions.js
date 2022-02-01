import { Row, Col } from 'reactstrap';

export const Instructions = () => (
    <Row>
        <Col sm='12' className='ml-50 mb-2'>
        <p className='font-medium-5 mt-1 extension-title' data-tour='extension-title'>
            Importar Tickets
        </p>
        <p className='text-primary mb-0'>La <b>institución</b> solo debe agregarse el acrónimo.</p>
        <p className='text-primary mb-0'>El <b>ciudadano_id</b> es la cédula del ciudadano. Sin guiones ni nada.</p>
        <p className='text-primary mb-0'>El <b>reporte_zona_id</b> es el código de la zona del reporte.</p>
        </Col>
    </Row>
)