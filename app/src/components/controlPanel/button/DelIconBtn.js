import { IconButton } from "@mui/material"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const DelIconBtn = ( { handler } ) => {
    return (
        <IconButton onClick={ handler } ><DeleteOutlinedIcon/></IconButton>
    )
}

export default DelIconBtn