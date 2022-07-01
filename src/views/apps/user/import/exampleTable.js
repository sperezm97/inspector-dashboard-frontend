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
                        <th>correo</th>
                        <th>institucion</th>
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>zona_id</th>
                        <th>cedula</th>
                        <th>telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ejemplo@correo.com</td>
                        <td>1</td>
                        <td>José Eduardo</td>
                        <td>Álvarez Lerebours</td>
                        <td>011801</td>
                        <td>00000000000</td>
                        <td>8092201111</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    </Col>
}