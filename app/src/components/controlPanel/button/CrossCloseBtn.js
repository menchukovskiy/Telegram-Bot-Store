import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';

const CrossCloseBtn = ( {handler} ) => {
    return (
        <IconButton className='crossClose' onClick={ handler } ><CloseOutlinedIcon/></IconButton>
    );
};

export default CrossCloseBtn;