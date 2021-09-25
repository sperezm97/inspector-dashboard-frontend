// ** Custom Components
import Timeline from '@components/timeline'

// ** Images
import pdf from '@src/assets/images/icons/file-icons/pdf.png'

// ** Third Party Components
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import { List } from 'react-feather'

// ** Timeline Data
const data = [
  {
    title: 'Creó Caso: Reparación Calle',
    content: 'Luis F Thomen #1442, El Millón',
    meta: '12 min atrás',
    customContent: (
      <Media className="align-items-center">
        <img className="mr-1" src={pdf} alt="pdf" height="23" />
        <Media body>Pruebas.pdf</Media>
      </Media>
    ),
  },
  {
    title: 'Creó Caso: Reparación Calle',
    content: 'Luis F Thomen #1442, El Millón',
    meta: '45 min atrás',
    color: 'warning',
    customContent: (
      <Media className="align-items-center">
        <img className="mr-1" src={pdf} alt="pdf" height="23" />
        <Media body>Pruebas.pdf</Media>
      </Media>
    ),
  },
  {
    title: 'Creó Caso: Reparación Calle',
    content: 'Luis F Thomen #1442, El Millón',
    meta: '2 dias atrás',
    color: 'info',
  },
]

const UserTimeline = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4" className="mb-1">
        <List className="mr-1" />
        Línea de Tiempo
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Timeline data={data} />
    </CardBody>
  </Card>
)

export default UserTimeline
