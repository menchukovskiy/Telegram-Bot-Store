import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getText } from '../../../utils/language';

const SelectCountItem = ( {onChange, value} ) => {

    const limitArray = [10,20,30,50,100]

    return (
         <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="countItem-label">{getText('TEXT_COUNT_PR')}</InputLabel>
                        <Select
                            labelId="countItem-label"
                            id="countItem-label-select-autowidth"
                            value={value}
                            onChange={onChange}
                            autoWidth
                            label={getText('TEXT_CATEGORY_PRODUCT')}
                        >

                            {
                                limitArray.map( (item,key) =>
                                    <MenuItem key={key} value={item}>{item}</MenuItem>
                                )
                            }


                        </Select>
                    </FormControl>
    );
};

export default SelectCountItem;