import { Button } from "@mui/material"
import { getText } from "../../../utils/language"

const CancelBtn = ({onClick}) => {

    return (
        <Button color="error" variant="text" onClick={onClick} >{ getText('CANCEL_TEXT') }</Button>
    )

}

export default CancelBtn