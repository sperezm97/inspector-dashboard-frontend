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
                        <th>incidente</th>
                        <th>institucion</th>
                        <th>ciudadano_id</th>
                        <th>ciudadano_telefono</th>
                        <th>reporte_zona_id</th>
                        <th>reporte_direccion</th>
                        <th>comentario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>tag1,tag2</td>
                        <td>ogtic</td>
                        <td>10000001</td>
                        <td>10000001</td>
                        <td>1</td>
                        <td>Sample Data</td>
                        <td>Sample Data</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    </Col>
}