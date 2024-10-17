import React from 'react';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const FilterBnt = ( { text, row, sort, onChange } ) => {

    const handlerClick = () => {
        let outSort
        if( sort === 'ASC' ){
            outSort = 'DESC'
        } else {
            outSort = 'ASC'
        }
        onChange( row, outSort )
    }

    return (
        <div className="filterBtn" onClick={handlerClick}>
            {text}
            { sort === 'ASC' ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon /> }
            
        </div>
    );
};

export default FilterBnt;