
import { Box, Typography } from '@mui/material';
import { getText } from '../../../utils/language';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { getAllMod } from '../../../store/slice/modifiersSlice'

const StockModItemList = ( {data, currency} ) => {

    const dispatch = useDispatch()
    const modifiersStore = useSelector(state => state.modifiers)


    useEffect(() => {
        if (modifiersStore.status !== 'load') {
            dispatch(getAllMod())
        }

    }, [])

   

    return (
        <div>
       { modifiersStore.data.length && data.map( item => 
        
        <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" className="tableRow" p={2}  >
            <Box display="flex" alignItems="center" className="w35">
                <Box className="pr_table_img_box">
                <SubdirectoryArrowRightIcon />
                </Box>
                    <Typography>{modifiersStore.data.filter(i => i.id === item.id_modifiers)[0]['name'] + ' ' + modifiersStore.data.filter(i => i.id === item.id_modifiers)[0]['list'].filter(i => i.id === item.value)[0]['name']}</Typography>
                </Box>
                <Box className="w20 center">{getText('TEXT_PRODUCT_MOD_1')}</Box>
                <Box className="w20 center">{item.price + ' ' + currency}</Box>
                <Box className="w15 center">{item.count + ' ' + getText('TEXT_COUNT_PR_VAL')}</Box>
        </Box>

       ) }
       </div>
    );
};

export default StockModItemList;