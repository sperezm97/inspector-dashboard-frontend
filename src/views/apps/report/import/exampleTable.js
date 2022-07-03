import { Row, Col, Card, CardHeader, CardTitle, Table } from 'reactstrap';
 
export var ExampleTable = function() {
  return <Col sm="12">
        <Card>
            <CardHeader className="justify-content-between flex-wrap">
                <CardTitle tag="h4">Ejemplo.csv</CardTitle>
            </CardHeader>
            <Table className="table-hover-animation" responsive>
                <thead>
                    <tr>
                        <th>titulo</th>
                        <th>direccion</th>
                        <th>descripcion</th>
                        <th>incidente</th>
                        <th>beneficiario</th>
                        <th>institucion</th>
                        <th>reporte_zona_id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Título de prueba</td>
                        <td>Dirección de prueba</td>
                        <td>Descripción de prueba</td>
                        <td>1,2,3</td>
                        <td>1</td>
                        <td>1</td>
                        <td>010101</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    </Col>
}