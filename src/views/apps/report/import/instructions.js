import { Row, Col } from 'reactstrap';

export var Instructions = function() {

    const dataInstructions = [
        {
            itemHeader: "Sus datos CSV deben estar en el siguiente formato:",
            itemText: [
                "La primera línea de su archivo CSV debe ser los encabezados de columna como en el ejemplo de la tabla.",
                "También asegúrese de que su archivo sea UTF-8 para evitar problemas de codificación innecesarios.",
            ],
        },
        {
            itemHeader: "Antes de importar, asegúrese de los siguientes apartados:",
            itemText: [
                "Los incidentes son separados por comas (,).",
                "La institución solo debe agregarse el acrónimo.",
                "El ciudadano_id es la cédula del ciudadano. Sin guiones y sin caracteres especiales.",
                "El reporte_zona_id es el código de la zona del reporte.",
            ],
        },
        {
            itemHeader: "Según las opciones configuradas de validación de sus tickets, el ticket no se importará si no provee:",
            itemText: [
                "El acrónimo de la institución (institucion)",
                "La cédula del cuidadano (ciudadano_id)",
                "El Id de la zona (reporte_zona_id)",
                "La dirección (reporte_direccion)",
            ],
        },
    ]

    return <Row>
        <Col sm='12' className='ml-50 mb-2'>
            <p className='font-medium-5 mt-1 extension-title' data-tour='extension-title'>
                Importar Tickets
            </p>
            {dataInstructions.map((data, index) => (
                <div key={index} className='text-primary mb-1'>
                    <p className="mb-0">
                        {index + 1}. {data.itemHeader} 
                    </p>
                    {data.itemText.map((dataText, index) => (
                        <div key={index} className="ml-1">
                            <p className="mb-0">
                                - {dataText}
                            </p>
                        </div>
                    ))}
                </div>
            ))}

            <p className="text-primary mb-0">
                <b>
                    Si aún desea importar todos los tickets, provea todos los campos de validación necesarios.
                </b>
            </p>
        </Col>
    </Row>
}