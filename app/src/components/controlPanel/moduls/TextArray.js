import React, { useState } from 'react';
import { tokens } from '../../../theme';
import { Box, useTheme } from "@mui/material"

const TextArray = ( { name, value, onChange, maxSize } ) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)


    const hendlerChange = ( e ) => {
        if( e.target.value.length <= maxSize ){
            onChange( e.target.value )
        }
    }

    return (
        <Box sx={{
            background: `${colors.black[900]} !important`,
            "& textarea": {
                background: `${colors.black[900]} !important`,
                color: `${colors.white[100]} !important` 
            },
            
        }}> 
            <textarea className='textAr' value={value} name={name} onChange={hendlerChange} ></textarea>
            <Box display='flex' justifyContent='end'>
                <span>{value.length}/{maxSize}</span>
            </Box>
        </Box>
        
    );
};

export default TextArray;