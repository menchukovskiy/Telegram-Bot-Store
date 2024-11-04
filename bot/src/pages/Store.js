import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Store = () => {


    
    const dataStore = useSelector(state => state.store)

    console.log(dataStore)

    return (
        <Box className="wrap" >
            { dataStore.banners.length ? 
            <Box className="storeBanner">

            </Box> : null
             }
            
        </Box>
    );
};

export default Store;