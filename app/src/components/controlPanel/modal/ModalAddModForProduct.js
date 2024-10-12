import React, { useState } from 'react';
import { DialogActions, Dialog, DialogContent, FormControl, Select, InputLabel, MenuItem, DialogTitle } from "@mui/material"
import { getText } from "../../../utils/language"
import CancelBtn from "../button/CancelBtn";
import AddBtn from '../button/AddBtn';

const ModalAddModForProduct = ({ open, onClose, modStore, listMod, add }) => {

    const [ mod, setMod ] = useState('')
    const [ modList, setModList ] = useState('')

    const handlerClose = () => {
        onClose()
        setMod('')
        setModList('')
    }

    const handlerAdd = () => {
        add({ modId: mod, listId: modList, count: 0, price: '' })
        handlerClose()
    }

    
    const handleChangeMod = (event) => {
        setMod( event.target.value )
        setModList('')
    }

    const handleChangeModList = (event) => {
        setModList( event.target.value )
    }

    

  
    return (
        <Dialog
            open={open}
            onClose={handlerClose}
            aria-labelledby="form-dialog-title"
            sx={{
                '& .MuiPaper-root': {
                    minWidth: '300px !important'
                }
            }}
        >
            <DialogTitle >{getText('TEXT_ADD_MOD_FOR_PR')}</DialogTitle>
            <DialogContent style={{paddingTop:10}} >
                <FormControl fullWidth>
                    <InputLabel id="mod-label">{getText('TEXT_ADD_MOD_FOR_PR_LABEL_1')}</InputLabel>
                    <Select
                        labelId="mod-label"
                        id="mod-label-select-autowidth"
                        value={mod}
                        onChange={handleChangeMod}
                        
                        label={getText('TEXT_ADD_MOD_FOR_PR_LABEL_1')}
                    >
                        
                        {
                            modStore.map(mod =>
                                <MenuItem key={mod.id} value={mod.id}>{mod.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                {mod !== '' ? 

                <FormControl style={{marginTop:15}} fullWidth>
                    <InputLabel id="modList-label">{getText('TEXT_ADD_MOD_FOR_PR_LABEL_2')}</InputLabel>
                    <Select
                        labelId="modList-label"
                        id="modList-label-select-autowidth"
                        value={modList}
                        onChange={handleChangeModList}
                        label={getText('TEXT_ADD_MOD_FOR_PR_LABEL_2')}
                    >
                        
                        {
                            
                            modStore.filter( item => item.id === mod )[0].list.map(modList => {
                               
                                if( listMod.filter( item => item.modId === mod && item.listId === modList.id ).length ){
                                    
                                    return (
                                        <MenuItem disabled key={modList.id} value={modList.id}>{modList.name}</MenuItem>
                                        )
                                } else {
                                    
                                    return (
                                        <MenuItem key={modList.id} value={modList.id}>{modList.name}</MenuItem>
                                        )
                                }

                                
                            }
                            )
                        }
                    </Select>
                </FormControl>


                : ''}

            </DialogContent>
            <DialogActions>
                <CancelBtn onClick={handlerClose} />
                <AddBtn onClick={handlerAdd} disabled={ mod !== '' && modList !== '' ? false : true} />
            </DialogActions>
        </Dialog>
    );
};

export default ModalAddModForProduct;