import React from 'react';
import { IconButton } from "@mui/material"
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const CopyBtnIcon = ({handler}) => {
    return (
        <IconButton onClick={ handler } ><ContentCopyOutlinedIcon/></IconButton>
    )
}

export default CopyBtnIcon;