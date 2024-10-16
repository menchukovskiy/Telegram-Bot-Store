import { Box, Switch, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getText } from '../../utils/language'
import { tokens } from "../../theme"
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../store/slice/categorySlice';
import { getProducts, changePublic, copyProduct, removeProduct, getEditProduct, setPage } from '../../store/slice/productSlice';
import AddBtn from '../../components/controlPanel/button/AddBtn'
import { useNavigate, useLocation, } from 'react-router-dom'
import { CUR_LIST, CUR } from '../../utils/const'
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn'
import CopyBtnIcon from '../../components/controlPanel/button/CopyBtnIcon'
import EditIconBtn from '../../components/controlPanel/button/EditIconBtn'
import { getAllMod } from '../../store/slice/modifiersSlice'
import PageNav from '../../components/controlPanel/moduls/PageNav'

const Products = () => {

    

    const dispatch = useDispatch()
    const history = useNavigate()
    const user = useSelector(state => state.user.user)
    const categoryStore = useSelector(state => state.category)
    const productStore = useSelector(state => state.product)
    const modifiersStore = useSelector(state => state.modifiers)


    useEffect(() => {
        if (categoryStore.status !== 'load') {
            dispatch(getAll())
        }

        if (modifiersStore.status !== 'load') {
            dispatch(getAllMod())
        }
        localStorage.removeItem('PR_EDIT')

    }, [])


    useEffect( () => {
        dispatch(getProducts([productStore.page, productStore.limit, productStore.category]))
    }, [productStore.page, productStore.limit, productStore.category, productStore.count] )

    

    const userCategory = categoryStore.data
    const userProduct = productStore.data

    let categoryData = {
        0: getText('NON_CATEGORY')
    }

    userCategory.forEach(element => {
        categoryData[element.id] = element.name
    });


    const addProduct = () => {
        history('add')
    }

    const handlerChangePublic = ( id, publicProduct ) => {
        dispatch( changePublic( [ id, publicProduct ] ) )
    }

    const handlerCopyProduct = ( id ) => {
        dispatch( copyProduct( id ) ).then(
            () => {
                history('add')
            }
        )
    }

    const handlerEditProduct = ( id ) => {
       dispatch( getEditProduct( id ) ).then(
        () => {
            history('edit/' + id)
          }
       )
    }

    const handlerRemoveProduct = ( id ) => {
        dispatch( removeProduct( [id, { limit: productStore.limit, page: productStore.page, category: productStore.category }] ) )
    }

    const hendlerPageNav = ( page ) => {
        dispatch( setPage( page ) )
    }



    return (
        <Box>
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <Box>
                    {getText('NAV_CP_PRODUCTS') + ' ' + productStore.count + ' ' + getText('TEXT_FROM') + ' ' + user.info.package.product_limit}
                </Box>
                <AddBtn onClick={addProduct} disabled={productStore.count >= user.info.package.product_limit} />
            </Box>
            <PageNav onChange={ hendlerPageNav } count={ productStore.count } limit={ productStore.limit } page={ productStore.page } />

            {productStore.count > 0 ?
                <Box className="table_title cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={1}>
                    <Box className="w35">{getText('TABLE_TITLE_NAME')}</Box>
                    <Box className="w20">{getText('TEXT_CATEGORY_PRODUCT')}</Box>
                    <Box className="w20">{getText('TEXT_PRICE_PRODUCT')}</Box>
                    <Box className="w10">{getText('TABLE_TITLE_PUBLIC')}</Box>
                    <Box className="w20"></Box>
                </Box> : null
            }
            <Box>
                {userProduct.map(product =>
                    <Box key={product.id} display="flex" alignItems="center" justifyContent="space-between" className="tableRow" p={2}  >
                        <Box display="flex" alignItems="center" className="w35">
                            <Box className="pr_table_img_box">
                                <img src={process.env.REACT_APP_API_URL + product.cover} />
                            </Box>
                            <Typography>{product.name}</Typography>
                        </Box>

                        <Box className="w20 center">{categoryData[product.category]}</Box>
                        
                        <Box className="w20 center">{product.price + ' ' + CUR_LIST[product.currency]}</Box>
                        
                        <Box className="w10 center">
                        
                            <Switch
                                color="secondary"
                                checked={product.public > 0 ? true : false}
                                onChange={()=>{
                                    handlerChangePublic( product.id, product.public )
                                }}
                                
                            />
                            
                        </Box>

                        <Box className="w20" display="flex" justifyContent="end">
                        {(productStore.count >= user.info.package.product_limit) ? null : <CopyBtnIcon handler={ () => handlerCopyProduct(product.id) } />  }
                        <EditIconBtn handler={ () => handlerEditProduct(product.id) } />
                        <DelIconBtn handler={() => handlerRemoveProduct(product.id)} />
                        </Box>
                        
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Products