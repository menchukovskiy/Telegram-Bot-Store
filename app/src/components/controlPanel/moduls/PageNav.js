import React from 'react';

import { Box, Pagination } from '@mui/material';

const PageNav = ({ count, limit, page, onChange }) => {

    const pageCount = Math.ceil( count / limit )
   
    const handleChange = (event, value) => {
        onChange(value)
      };


    return (
        <Box display="flex" justifyContent="end" >
            { pageCount > 1 && <Pagination count={pageCount} page={page} shape="rounded" onChange={handleChange} /> }
            
        </Box>
    );
};

export default PageNav;