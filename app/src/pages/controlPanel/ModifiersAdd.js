import React, { useState, useEffect } from 'react'
import BackBtn from '../../components/controlPanel/button/BackBtn';
import { Box, TextField, Typography } from '@mui/material';
import SaveBtn from '../../components/controlPanel/button/SaveBtn';
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn';
import ModalSuccess from '../../components/controlPanel/modal/ModalSuccess';
import { getText } from '../../utils/language';
import { useInput } from '../../utils/hooks';
import AddBtn from '../../components/controlPanel/button/AddBtn';
import { useDispatch, useSelector } from 'react-redux';
import { add, getAllMod } from '../../store/slice/modifiersSlice'
import { Navigate } from "react-router-dom"
import { CONTROL_PANEL_ROUTE } from '../../utils/const'


const ModifiersAdd = () => {

    const dispatch = useDispatch()

    const modifiersStore = useSelector(state => state.modifiers)

    let initialState = {
        name: '',
        list: [{ id:1, name: '' }]
    }

    useEffect(() => {
        if( modifiersStore.status !== 'load' ){
            dispatch(getAllMod())
        }
        
    }, [dispatch])

    if( modifiersStore.status === "copy" ){

        const copyModData = modifiersStore.data.find(mod => mod.id === modifiersStore.copyId)
        initialState = {
            name: copyModData.name,
            list: copyModData.list
        }
    }
    
    
    const [successModal, setSuccessModal] = useState(false)
    const nameMod = useInput(initialState.name, { isEmpty: true, maxLength: 200 })
    const [listMod, setListMod] = useState(initialState.list)

    const handlerAddList = () => {
        setListMod([...listMod, { id:listMod[listMod.length - 1].id + 1, name: '' } ])
      
    }

    const handlerRemoveList = ( id ) => {
        setListMod( listMod.filter( item => item.id !== id ) )
    }

    const handlerChangeItemListMod = ( e, id ) => {

        setListMod( listMod.map( item => {
            if( item.id !== id ) return item
            return {
                ...item,
                name: e.target.value
            }
        } ) )
    }

    const addMod = () => {
        dispatch( add( [ nameMod.value, listMod ] ) )
        setSuccessModal(true)
    }

    const checkDisable = () => {
        if( listMod[0].name.length ){
            if(!nameMod.inputValid){
                return false
            } else {
                return true
            }
           } 

        return true
    }


    if ( modifiersStore.count >= modifiersStore.maxCount  ) {
        return <Navigate to={CONTROL_PANEL_ROUTE + '/modifiers'} />
    } 

   


    return (
        <Box>
            <ModalSuccess
                message={'TEXT_SUCCESS_ADD_MOD'}
                open={successModal}
                onClose={
                    () => {
                        setSuccessModal(false)
                    }
                }
            />
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <BackBtn />
                <SaveBtn status={modifiersStore.status} disabled={checkDisable()} variant="contained" color="success" onClick={addMod} />
            </Box>
            <Box>
                <Box p={2} className="cp_main">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={getText('TEXT_NAME_MOD')}
                        value={nameMod.value}
                        onChange={e => nameMod.onChange(e)}
                        onBlur={e => nameMod.onBlur(e)}
                        error={nameMod.getError()}
                        helperText={nameMod.getError()}
                        

                    />
                    <Box p={2}>
                        <Typography sx={{marginBottom:'15px'}} variant="subtitle1" gutterBottom>{getText('TEXT_H_LIST_MOD')}</Typography>
                        <Box>
                            {listMod.map((item,key) =>
                                <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between">
                                    <TextField 
                                        value={item.name}
                                        fullWidth
                                        label={getText('TEXT_NAME_LIST_MOD')}
                                        sx={{ marginBottom: '10px' }}
                                        onChange={ e => handlerChangeItemListMod( e, item.id ) }
                                    />
                                    {key ? <DelIconBtn handler={() => {
                                        handlerRemoveList( item.id )
                                    }} /> : null}
                                </Box>

                            )}
                            <Box display="flex" justifyContent="end">
                                <AddBtn onClick={handlerAddList} disabled={listMod.length < 20 ? false : true} />
                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>

    );
};

export default ModifiersAdd;