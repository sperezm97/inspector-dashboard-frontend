import { Button } from 'reactstrap'

export const ButtonRipple = (props) => {

    const { color = 'primary', onClick, label, outline=false  } = props

    return (
        <Button.Ripple 
                color={color}
                onClick={onClick}
                outline={outline}
            >
                {label}
        </Button.Ripple>
    )
}