import { Box, Typography } from '@mui/material'
import React, { useEffect} from 'react'
import { getText } from '../../utils/language'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../store/slice/categorySlice';
import { useNavigate} from 'react-router-dom'
import { getAllMod } from '../../store/slice/modifiersSlice'
import { getStock, setOrders } from '../../store/slice/stockSlice'
import { CUR_LIST} from '../../utils/const'
import FilterBnt from '../../components/controlPanel/moduls/FilterBnt';
import StockModItemList from '../../components/controlPanel/moduls/StockModItemList';
import AddBtn from '../../components/controlPanel/button/AddBtn';

const Stock = () => {

    const dispatch = useDispatch()
    const history = useNavigate()
    const categoryStore = useSelector(state => state.category)
    const modifiersStore = useSelector(state => state.modifiers)
    const stockStore = useSelector(state => state.stock)

    useEffect(() => {
        if (categoryStore.status !== 'load') {
            dispatch(getAll())
        }

        if (modifiersStore.status !== 'load') {
            dispatch(getAllMod())
        }

    }, [])

    useEffect(() => {
        dispatch(getStock([stockStore.category, stockStore.order, stockStore.sort]))
    }, [stockStore.category, stockStore.count, stockStore.order, stockStore.sort])

    let categoryData = {
        0: getText('NON_CATEGORY')
    }

    categoryStore.data.forEach(element => {
        categoryData[element.id] = element.name
    });

    const handlerChangeOrder = (order, sort) => {
        dispatch(setOrders({ order, sort }))
    }

    const handlerAdd = () => {
        history('add')
    }

    return (
        <Box>
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <Box>{getText('NAV_CP_PRODUCTS') + ' ' + stockStore.count}</Box>
                <AddBtn onClick={handlerAdd} disabled={stockStore.count < 0} />
            </Box>

            <Box className="table_title cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={1}>
                <Box className="w35">
                    <FilterBnt
                        text={getText('TABLE_TITLE_NAME')}
                        row={stockStore.order}
                        sort={stockStore.sort}
                        onChange={handlerChangeOrder}
                    />
                </Box>
                <Box className="w20">{getText('TEXT_CATEGORY_PRODUCT')}</Box>
                <Box className="w20">{getText('TEXT_PRICE_PRODUCT')}</Box>
                <Box className="w15">{getText('TEXT_COUNT_PR')}</Box>
                
            </Box>

            <Box>
                {stockStore.data.map(product => {

                    let countProduct = Number(product.count)

                    if (product.user_products_modifiers) {
                        product.user_products_modifiers.forEach(mod => countProduct += mod.count)
                    }
 
                    return (
                        <div key={product.id}>
                        <Box  display="flex" alignItems="center" justifyContent="space-between" className="tableRow" p={2}  >
                            <Box display="flex" alignItems="center" className="w35">
                                <Box className="pr_table_img_box">
                                    <img src={process.env.REACT_APP_API_URL + product.cover} />
                                </Box>
                                <Typography>{product.name}</Typography>
                            </Box>
                            <Box className="w20 center">{categoryData[product.category]}</Box>
                            <Box className="w20 center">{product.price + ' ' + CUR_LIST[product.currency]}</Box>
                            <Box className="w15 center">{countProduct + ' ' + getText('TEXT_COUNT_PR_VAL')}</Box>
                           
                        </Box>
                        <StockModItemList  currency={CUR_LIST[product.currency]} data={product.user_products_modifiers} />
                        </div>
                    )
                })}
            </Box>

        </Box>
    )
}

export default Stock