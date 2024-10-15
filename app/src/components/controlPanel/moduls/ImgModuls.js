import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getText } from "../../../utils/language"
import { MAX_IMG_SIZE } from '../../../utils/const'
import CrossCloseBtn from '../button/CrossCloseBtn';

const ImgModuls = ( { name, onChange, img } ) => {

    let initialState = {
        prevImg: ''
    }
/*
    if( typeof img === 'object' ){
        const findImg = img.find(i => i.name === name)
        if( findImg.data !== '' ){
            initialState.prevImg = findImg.data
        }
    } else if( img !== '' ){
        initialState.prevImg = img
    }
*/
    const [ prevImg, setPrevImg ] = useState( initialState.prevImg )
    const [ value, setValue ] = useState( '' )

console.log(img)

   

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
                if( typeof img === 'object' && img !== null ){
                    onChange(name, e.target.files[0])
                } else {
                    onChange(e.target.files[0])
                } 
           }
        } else {
            return
        }
        
    }

    const clearPrevBoxImg = () => {
        setPrevImg('')
        setValue('')
        if( typeof img === 'object' && img !== null ){
            onChange(name, null)
        } else {
            onChange(null)
        }
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