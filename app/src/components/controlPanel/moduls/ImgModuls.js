import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getText } from "../../../utils/language"
import { MAX_IMG_SIZE } from '../../../utils/const'
import CrossCloseBtn from '../button/CrossCloseBtn';

const ImgModuls = ( { name, onChange, img } ) => {

    let initialState = {
        prevImg: ''
    }

    if( img !== '' ){
        initialState.prevImg = process.env.REACT_APP_API_URL + img
    }

    const [ prevImg, setPrevImg ] = useState( initialState.prevImg )
    const [ value, setValue ] = useState( '' )
   

    const handlerChange = ( e ) => {
        
        setValue(e.target.value)

        const maxImgSzise = MAX_IMG_SIZE * 1024 * 1024
        
        if( e.target.files[0].type.match('image.*') ){
           if( e.target.files[0].size <= maxImgSzise ){
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPrevImg( reader.result )
                };
                reader.readAsDataURL(e.target.files[0]);
                onChange(name, e.target.files[0])
           }
        } else {
            return
        }
        
    }

    const clearPrevBoxImg = () => {
        setPrevImg('')
        setValue('')
        onChange(name, '')
    }


    return (
        <Box className='img_box' display="flex" alignItems="center" justifyContent="center">
            <div className={ prevImg !== '' ? 'prevBoxImg' : 'hidden' }>
            <CrossCloseBtn handler={ clearPrevBoxImg } ></CrossCloseBtn>
            <img alt="" src={prevImg} />
            </div>

            <label className={ prevImg !== '' ? 'hidden' : '' } htmlFor={name}>{ getText('TEXT_CH_IM') }</label>
            <input value={value} onChange={handlerChange} className="hidden" id={name} type='file' name={name} />

        </Box>
    );
};

export default ImgModuls;