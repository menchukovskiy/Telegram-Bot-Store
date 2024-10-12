import { Button } from "@mui/material"
import { getText } from "../../../utils/language"
import LoadBox from "../load/loadBox"

const SaveBtn = ({onClick, disabled, status}) => {

    return (
        <div>
        <LoadBox status={status} />
        <Button disabled={disabled} variant="contained" color="success" onClick={onClick} >{ getText('SAVE_TEXT') }</Button>
        </div>  
    )

}

export default SaveBtn