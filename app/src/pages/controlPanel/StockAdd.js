import React, { useEffect, useState } from 'react'
import { getText } from '../../utils/language'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';
import ModalSuccess from '../../components/controlPanel/modal/ModalSuccess';
import BackBtn from '../../components/controlPanel/button/BackBtn';
import SaveBtn from '../../components/controlPanel/button/SaveBtn';
import { useInput } from '../../utils/hooks';
import AddBtn from '../../components/controlPanel/button/AddBtn';
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn';
import { getStock, addStock } from '../../store/slice/stockSlice'
import { getAllMod } from '../../store/slice/modifiersSlice'

const StockAdd = () => {

    const dispatch = useDispatch()
    const stockStore = useSelector(state => state.stock)
    const modifiersStore = useSelector(state => state.modifiers)
    const [successModal, setSuccessModal] = useState(false)
    let options = []

    useEffect(() => {
        
        if (stockStore.status !== 'load') {
            dispatch(getStock([]))
        }

        if (modifiersStore.status !== 'load') {
            dispatch(getAllMod())
        }
    }, [dispatch])

    

    let initialState = [{
        id: 1,
        value: null,
        count: '',
        chosed: ''
    }]


    const [listAdd, setListAdd] = useState(initialState)

if(modifiersStore.status === 'load'){
    stockStore.data.forEach(product => {
        if (product.user_products_modifiers.length) {
            product.user_products_modifiers.forEach(mod => {
                options.push({
                    label: product.name + ' ' + modifiersStore.data.filter(i => i.id === mod.id_modifiers)[0]['name'] + ' ' + modifiersStore.data.filter(i => i.id === mod.id_modifiers)[0]['list'].filter(i => i.id === mod.value)[0]['name'],
                    value: product.id + '|' + mod.id,
                })
            })
        } else {
            options.push({
                label: product.name,
                value: product.id,
            })
        }
    })
}
    

    const handleChangeListValue = (value, id) => {
        setListAdd(listAdd.map(item => {
            if (item.id !== id) return item
            return {
                ...item,
                value: value,
                selected: value.value
            }
        }))
    }

  

    const handleChangeListCount = (count, id) => {
        setListAdd(listAdd.map(item => {
            if (item.id !== id) return item
            return {
                ...item,
                count: count
            }
        }))
    }

    const handlerRemoveList = (id) => {
        setListAdd(listAdd.filter(item => item.id !== id))
    }

    const handleAddItem = () => {
        if (listAdd.length) {
            setListAdd([...listAdd, { id: listAdd[listAdd.length - 1].id + 1, value: null, count: '' }])
        } else {
            setListAdd(initialState)
        }

    }

    const checkDisable = () => {

        for( let i = 0; i < listAdd.length; i++ ){
            if( listAdd[i].count === '' ){
                return true
            }
        }
        return false
    }

    const handleAdd = () => {
        dispatch( addStock( listAdd  ) )
        setSuccessModal(true)
    }

    

    

    return (
        <Box>
            <ModalSuccess
                message={'TEXT_SUCCESS_ADD_STOCK'}
                open={successModal}
                onClose={
                    () => {
                        setSuccessModal(false)
                    }
                }
            />
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <BackBtn />
                <SaveBtn status={stockStore.status} disabled={checkDisable()} variant="contained" color="success" onClick={handleAdd} />
            </Box>

            <Box p={2} className="cp_main">
                {listAdd.map(item =>
                    <Box key={item.id} sx={{ marginBottom: '15px' }} display="flex">
                        <Autocomplete
                            fullWidth
                            onChange={(event, newValue) => {
                                handleChangeListValue(newValue, item.id)

                            }}
                            value={item.value}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            options={options}

                            getOptionDisabled={(option) => {

                                for (let i = 0; i < listAdd.length; i++) {
                                    if (listAdd[i].selected === option.value) {
                                        return true;
                                    }
                                }
                                return false
                            }


                            }

                            renderInput={(params) => (
                                <TextField

                                    {...params}
                                    label={getText("TEXT_CHOSE_PRODUCT")}
                                />
                            )}
                        />
                        <TextField

                            sx={{ marginLeft: '10px', marginRight: '10px' }}
                            variant="outlined"
                            value={item.count}
                            label={getText('TEXT_COUNT_PR')}
                            onChange={(e) => handleChangeListCount(e.target.value, item.id)}
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                        />
                        <DelIconBtn sx={{ marginLeft: '10px' }} handler={() => {
                            handlerRemoveList(item.id)
                        }} />
                    </Box>
                )}

            </Box>
            <Box display='flex' justifyContent='center'>
                <AddBtn onClick={handleAddItem} disabled={listAdd.length < options.length ? false : true} ></AddBtn>
            </Box>
        </Box>
    );
};

export default StockAdd;