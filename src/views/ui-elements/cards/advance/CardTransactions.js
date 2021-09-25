import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'San Francisco de Macorís',
      color: 'light-primary',
      subtitle: 'Encargado Provincial',
      amount: '- 74',
      Icon: Icon.Pocket,
      down: true,
    },
    {
      title: 'Santiago Rodríguez',
      color: 'light-success',
      subtitle: 'Encargado Provincial',
      amount: '+ 480',
      Icon: Icon.Check,
    },
    {
      title: 'San Francisco de Macorís',
      color: 'light-danger',
      subtitle: 'Encargado Provincial',
      amount: '+ 590',
      Icon: Icon.DollarSign,
    },
    {
      title: 'Santiago Rodríguez',
      color: 'light-warning',
      subtitle: 'Encargado Provincial',
      amount: '- 12',
      Icon: Icon.CreditCard,
      down: true,
    },
    {
      title: 'San Francisco de Macorís',
      color: 'light-info',
      subtitle: 'Encargado Provincial',
      amount: '+ 98',
      Icon: Icon.TrendingUp,
    },
    {
      title: 'San Francisco de Macorís',
      color: 'light-danger',
      subtitle: 'Encargado Provincial',
      amount: '+ 700',
      Icon: Icon.DollarSign,
    },
  ]

  const renderTransactions = () =>
    transactionsArr.map((item, index) => (
      <div key={index} className="transaction-item">
        <Media>
          <Avatar
            className="rounded"
            color={item.color}
            icon={<item.Icon size={18} />}
          />
          <Media body>
            <h6 className="transaction-title">{item.title}</h6>
            <small>{item.subtitle}</small>
          </Media>
        </Media>
        <div
          className={`font-weight-bolder ${
            item.down ? 'text-danger' : 'text-success'
          }`}
        >
          {item.amount}
        </div>
      </div>
    ))

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">Provincias</CardTitle>
        <Icon.MoreVertical size={18} className="cursor-pointer" />
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
