import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const CardGrid = ({cardHeaderTitle, cardHeaderComponent, children}) => {

    return (
        <Card>
            {cardHeaderTitle || cardHeaderComponent ? <>
                <CardHeader>
                    {cardHeaderTitle &&
                        <CardTitle tag='h4'>{cardHeaderTitle}</CardTitle>
                    }
                    {cardHeaderComponent &&
                        cardHeaderComponent()
                    }
                </CardHeader> 
                </> : null
            }

            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default CardGrid