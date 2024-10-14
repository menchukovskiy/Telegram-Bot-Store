import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, } from 'react-router-dom'
import { Box, Typography, useTheme } from '@mui/material'
import AddBtn from '../../components/controlPanel/button/AddBtn'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMod, removeMod, copyMod } from '../../store/slice/modifiersSlice'
import { getText } from '../../utils/language';
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn'
import CopyBtnIcon from '../../components/controlPanel/button/CopyBtnIcon'
import EditIconBtn from '../../components/controlPanel/button/EditIconBtn'
import LoadBox from '../../components/controlPanel/load/loadBox';

const Modifiers = () => {
    localStorage.removeItem('MD_EDIT')
    
    const history = useNavigate()

    const addMod = () => {
        history('add')
    }

    const dispatch = useDispatch()
    const modifiersStore = useSelector(state => state.modifiers)

   

    useEffect(() => {
        if( modifiersStore.status !== 'load' ){
            dispatch(getAllMod())
        }
        
    }, [dispatch])

    const modifiersUser = modifiersStore.data

    const handlerCopy = ( id ) => {
        dispatch( copyMod( id ) )
        history('add')
    }

    const handlerEdit = ( id ) => {
        history('edit/' + id)
    }

    

    return (
        <Box>
           <LoadBox status={modifiersStore.status} />

            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
            
                <Box>{getText('NAV_CP_MODIFIERS') + ' ' + modifiersStore.count + ' ' + getText('TEXT_FROM') + ' ' + modifiersStore.maxCount}</Box>
                <AddBtn onClick={addMod} disabled={modifiersStore.count >= modifiersStore.maxCount} />

            </Box>

            <Box>
            { modifiersUser.map( mod => 
                    

                    <Box key={mod.id} display="flex" alignItems="center" justifyContent="space-between" className="tableRow" p={2}  >
                        <Box>
                            <Typography>{mod.name}</Typography>
                        </Box>

                        <Box>
                        {(modifiersStore.count >= modifiersStore.maxCount) ? null : <CopyBtnIcon handler={ () => handlerCopy(mod.id) } />  }
                            
                            <EditIconBtn handler={ () => handlerEdit(mod.id) } />
                            <DelIconBtn handler={() => dispatch(removeMod(mod.id))} />
                        </Box>
                    </Box>
                
             ) }
            </Box>

        </Box>
    );
};

export default Modifiers;