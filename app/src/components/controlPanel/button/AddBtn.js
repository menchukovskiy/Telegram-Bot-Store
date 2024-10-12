import { Button, useTheme } from "@mui/material"
import { getText } from "../../../utils/language"
import { tokens } from "../../../theme"

const AddBtn = ({ onClick, disabled }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Button 
            className="addButton"
            onClick={ onClick }
            disabled={disabled}
            sx={{ background: `${colors.blue[500]} ` }} variant="contained">{getText('TEXT_ADD')}</Button>
    )

}

export default AddBtn