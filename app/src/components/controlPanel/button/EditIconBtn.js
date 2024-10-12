import { IconButton } from '@mui/material';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditIconBtn = ( {handler} ) => {
    return (
        <IconButton onClick={ handler } ><EditOutlinedIcon/></IconButton>
    );
};

export default EditIconBtn;