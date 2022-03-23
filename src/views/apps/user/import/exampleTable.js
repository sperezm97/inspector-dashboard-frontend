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
                        <th>cedula</th>
                        <th>correo</th>
                        <th>institucion</th>
                        <th>zona_id</th>
                        {/* <th>roles</th> */}
                        <th>telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>00000000000</td>
                        <td>ejemplo@correo.com</td>
                        <td>ogtic</td>
                        <td>010101</td>
                        {/* <td>1,2,3</td> */}
                        <td>8092201111</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    </Col>
}