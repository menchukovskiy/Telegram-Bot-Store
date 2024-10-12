import { Box, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getText } from '../../utils/language'
import { tokens } from "../../theme"
import ModalCategory from '../../components/controlPanel/modal/ModalCategory'
import { useInput } from '../../utils/hooks'
import AddBtn from '../../components/controlPanel/button/AddBtn'
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn'
import { useDispatch, useSelector } from 'react-redux';
import { getAll, remove, edit } from '../../store/slice/categorySlice'
import EditIconBtn from '../../components/controlPanel/button/EditIconBtn'
import CancelBtn from '../../components/controlPanel/button/CancelBtn'
import SaveBtn from '../../components/controlPanel/button/SaveBtn'
import LoadBox from '../../components/controlPanel/load/loadBox'


const Category = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const categoryStore = useSelector(state => state.category)

    useEffect(() => {
        if( categoryStore.status !== 'load' ){
            dispatch(getAll())
        }
        
    }, [dispatch])


    const userCategory = categoryStore.data

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [AddModalVisible, setAddModal] = useState(false)
    const nameCategory = useInput('', { isEmpty: true })
    const [updateItem, setUpdateItem] = useState(null)
    const [ changeInputValue, setChangeInputValue ] = useState(null)
    const [ changeId, setChangeId ] = useState(null)
    const handleInputChange = ( { target: { value } } ) => {
        setChangeInputValue( value )
    }

   

    return (
        <Box>
            <LoadBox status={categoryStore.status} />
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <Box>
                    {getText('NAV_CP_CATEGORY') + ' ' + categoryStore.count + ' ' + getText('TEXT_FROM') + ' ' + user.info.package.category_limit}
                </Box>

                <AddBtn onClick={() => setAddModal(true)} disabled={categoryStore.count >= user.info.package.category_limit} />

                <ModalCategory
                    input={nameCategory}
                    colors={colors}
                    open={AddModalVisible}
                    onClose={
                        () => {
                            nameCategory.clearInput()
                            setAddModal(false)
                        }
                    } />
            </Box>

            <Box>
                {userCategory.map(category => {

                    const isBeingUpdatedCategory = updateItem === category.id
                   
                    const editCategory = () => {
                        setUpdateItem(null)
                        dispatch( edit( [ changeId, changeInputValue ] ) )
                    }

                    const renderTitleOrInput = () => {
                        return isBeingUpdatedCategory ? (

                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                
                                <TextField
                                    variant="outlined"
                                    value={changeInputValue}
                                    label={getText('TEXT_NAME_CATEGORY')}
                                    autoFocus
                                    onChange={ handleInputChange }
                                />
                                <CancelBtn onClick={() => setUpdateItem(null)} />
                                <SaveBtn disabled={ changeInputValue ? false : true} onClick={ editCategory }/>
                            </Box>


                        ) : (
                            <Typography>{category.name}</Typography>
                        );
                    }

                    return (

                        <Box key={category.id} display="flex" alignItems="center" justifyContent="space-between" className="tableRow" p={2}  >
                            {renderTitleOrInput()}
                            <Box>
                                <EditIconBtn handler={() => {
                                    setUpdateItem(isBeingUpdatedCategory ? null : category.id)
                                    setChangeInputValue( category.name )
                                    setChangeId(category.id)
                                    }} />
                                <DelIconBtn handler={() => dispatch(remove(category.id))} />
                            </Box>
                        </Box>
                    )

                })}
            </Box>

        </Box>
    )
}

export default Category