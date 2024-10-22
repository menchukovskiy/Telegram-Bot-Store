import { Button, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { getText } from "../../../utils/language"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { tokens } from "../../../theme"

const BackBtn = () => {
    const history = useNavigate()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Button
            sx={{ color: `${colors.blue[500]} ` }}
            startIcon={<ArrowBackIosOutlinedIcon/>}
            onClick={ () => history(-1) }
        >
            {getText('TEXT_BACK')}
        </Button>
 
    );
};

export default BackBtn;