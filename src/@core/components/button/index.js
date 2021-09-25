import { Button } from 'reactstrap'

export const ButtonRipple = (props) => {

    const { color = 'primary', onClick, label  } = props

    return (
        <Button.Ripple 
                color={color}
                onClick={onClick}
            >
                {label}
        </Button.Ripple>
    )
}