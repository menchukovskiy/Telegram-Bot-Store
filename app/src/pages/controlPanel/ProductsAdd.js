import React, { useEffect, useState } from 'react'
import { getText } from '../../utils/language'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../store/slice/categorySlice';
import { getProducts, addProduct } from '../../store/slice/productSlice';
import { Navigate } from "react-router-dom"
import { CONTROL_PANEL_ROUTE, CUR_LIST, CUR, COUNT_SUB_PHOTO_PRODUCT } from '../../utils/const'
import { Box, TextField, Typography, FormControl, Select, InputLabel, MenuItem, OutlinedInput, InputAdornment } from '@mui/material';
import ModalSuccess from '../../components/controlPanel/modal/ModalSuccess';
import BackBtn from '../../components/controlPanel/button/BackBtn';
import SaveBtn from '../../components/controlPanel/button/SaveBtn';
import { useInput } from '../../utils/hooks';
import { getInfo } from '../../store/slice/botSlice';
import ImgModuls from '../../components/controlPanel/moduls/ImgModuls'
import TextArray from '../../components/controlPanel/moduls/TextArray';
import AddBtn from '../../components/controlPanel/button/AddBtn';
import DelIconBtn from '../../components/controlPanel/button/DelIconBtn';
import { getAllMod } from '../../store/slice/modifiersSlice'
import ModalAddModForProduct from '../../components/controlPanel/modal/ModalAddModForProduct';

const ProductsAdd = () => {
 
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user.user)
    const categoryStore = useSelector(state => state.category)
    const productStore = useSelector(state => state.product)
    const botStore = useSelector(state => state.bot)
    const modifiersStore = useSelector(state => state.modifiers)

    let initialState = {
        name: '',
        category: '',
        currency: botStore.currency,
        price: '',
        about: '',
        productModList: []
    }


    useEffect(() => {
        if (botStore.status !== 'load') {
            dispatch(getInfo())
        }

        if (categoryStore.status !== 'load') {
            dispatch(getAll())
        }
        
        if (productStore.status !== 'load' ) {
            dispatch(getProducts([]))
        }

        if (modifiersStore.status !== 'load') {
            dispatch(getAllMod())
        }

    }, [dispatch])


    if (productStore.status === "copy") {
        const copyProductData = productStore.data.find(pr => pr.id === productStore.copyId);
        initialState = {
            name: copyProductData.name,
            category: copyProductData.category,
            currency: copyProductData.currency,
            price: copyProductData.price,
            about: copyProductData.description,
            productModList: productStore.copyModList
        }

        if( copyProductData.category === 0 ){
            initialState.category = ''
        }
    } 

    const [productModList, setproductModList] = useState(initialState.productModList)
    const [successModal, setSuccessModal] = useState(false)
    const [addModModal, setAddModModal] = useState(false)
    const nameProduct = useInput(initialState.name, { isEmpty: true, maxLength: 200 })
    const [category, setCategory] = useState(initialState.category);
    const [currency, setCurrency] = useState(initialState.currency)
    const [currencyIcon, setCurrencyIcon] = useState(CUR_LIST[initialState.currency])
    const [price, setPrice] = useState(initialState.price)
    const [about, setAbout] = useState(initialState.about)
    const [cover, setCover] = useState('')
    const [listImg, setList] = useState([
        {
            name : 'sub_photo_0',
            data : ''
        },
        {
            name : 'sub_photo_1',
            data : ''
        },
        {
            name : 'sub_photo_2',
            data : ''
        },
        {
            name : 'sub_photo_3',
            data : ''
        }
    ])

    

    const checkDisable = () => {
        if (nameProduct.value !== '') {
            return false
        }
        return true
    }

    if (productStore.count >= user.info.package.product_limit) {
        return <Navigate to={CONTROL_PANEL_ROUTE + '/products'} />
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
        setCurrencyIcon(CUR_LIST[event.target.value])
    };

    const handlerMod = () => {
        setAddModModal(true)
    }

    const addLineModList = (data) => {
        setproductModList([...productModList, data])
    }

    const handlerChangeItemListModCount = (e, id) => {
        setproductModList(productModList.map(item => {
            console.log(item.listId, id)
            if (item.listId !== id) return item
            return {
                ...item,
                count: e.target.value
            }
        }))
    }

    const handlerChangeItemListModPrice = (e, id) => {

        if (Number.isInteger(Number(e.target.value))) {
            setproductModList(productModList.map(item => {

                if (item.listId !== id) return item

                return {
                    ...item,
                    price: e.target.value
                }
            }))
        }

    }

    const handlerRemoveItemListMod = (id) => {
        setproductModList(productModList.filter(item => item.listId !== id))
    }

    const handlePrice = (e) => {
        if (Number.isInteger(Number(e.target.value))) {
            setPrice(e.target.value)
        }

    }

    const changeListImg = ( id, data ) => {
        setList( listImg.map( item => {
            if( item.name !== id ) return item
            return {
                ...item,
                data: data
            }
        } ) )
    }

    const changeCover = ( name, data ) => {
        setCover( data )
    }

    

    const createProduct = () => {
        const formData = new FormData()
        formData.append('name', nameProduct.value)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('currency', currency)
        formData.append('description', about)
       
        if( typeof cover === 'string' ){
            formData.append('cover', 'non.jpg')            
        } else {
            formData.append('cover', 'file') 
            formData.append('coverImg', cover) 
        }
        
        listImg.forEach( item => formData.append(item.name, item.data) )
        
        formData.append('modifiers', JSON.stringify(productModList))
       
        dispatch( addProduct(formData) )
        setSuccessModal(true)
    }

    

    return (
        <Box>
            <ModalAddModForProduct
                open={addModModal}
                onClose={
                    () => {
                        setAddModModal(false)
                    }
                }
                modStore={modifiersStore.data}
                listMod={productModList}
                add={addLineModList}
            />
            <ModalSuccess
                message={'TEXT_SUCCESS_ADD_PRODUCT'}
                open={successModal}
                onClose={
                    () => {
                        setSuccessModal(false)
                    }
                }
            />
            <Box className="cp_top_bar" display="flex" alignItems="center" justifyContent="space-between" p={2} >
                <BackBtn />
                <SaveBtn status={productStore.status} disabled={checkDisable()} variant="contained" color="success" onClick={createProduct} />
            </Box>

            <Box>
                <Box p={2} className="cp_main">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={getText('TEXT_NAME_PRODUCT')}
                            value={nameProduct.value}
                            onChange={e => nameProduct.onChange(e)}
                            onBlur={e => nameProduct.onBlur(e)}
                            error={nameProduct.getError()}
                        />

                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="category-label">{getText('TEXT_CATEGORY_PRODUCT')}</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-label-select-autowidth"
                                value={category}
                                onChange={handleChangeCategory}
                                autoWidth
                                label={getText('TEXT_CATEGORY_PRODUCT')}
                            >
                                <MenuItem value="">
                                    <em>{getText('TEXT_NONE')}</em>
                                </MenuItem>

                                {
                                    categoryStore.data.map(cat =>
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    )
                                }


                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel htmlFor="price-box">{getText('TEXT_PRICE_PRODUCT')}</InputLabel>
                            <OutlinedInput
                                id="price-box"
                                name='price'
                                startAdornment={<InputAdornment position="start">{currencyIcon}</InputAdornment>}
                                label={getText('TEXT_PRICE_PRODUCT')}
                                onChange={handlePrice}
                                value={price}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="currency-label">{getText('TEXT_CURRENCY_PRODUCT')}</InputLabel>
                            <Select
                                labelId="currency-label"
                                id="currency-select-autowidth"
                                value={currency}
                                onChange={handleChangeCurrency}

                                autoWidth
                                label={getText('TEXT_CURRENCY_PRODUCT')}
                            >

                                {
                                    CUR.map(item =>
                                        <MenuItem key={item} value={item}>{getText('TEXT_CUR_' + item)}</MenuItem>
                                    )
                                }


                            </Select>
                        </FormControl>

                    </Box>
                </Box>

                <Box p={2} className="cp_main" >
                    <Typography variant="h5" gutterBottom>{getText('TEXT_PHOTO_PRODUCT')}</Typography>
                    <Box display="flex" alignItems="stretch" justifyContent="space-between">
                        <Box>
                            <Typography className='h_sub' variant="h6" gutterBottom>{getText('TEXT_MAIN_PRODUCT')}</Typography>

                            <ImgModuls img={cover} onChange={ changeCover } name='cover' ></ImgModuls>

                        </Box>

                        <Box>
                            <Typography className='h_sub' variant="h6" gutterBottom>{getText('TEXT_SUB_PRODUCT')}</Typography>
                            <Box display="flex" justifyContent="space-between">

                                { listImg.map( item => 
                                    <ImgModuls key={item.name} img={item.data} onChange={ changeListImg } name={item.name} ></ImgModuls>
                                 ) }

                                
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box p={2} className="cp_main">
                    <Typography variant="h5" gutterBottom>{getText('TEXT_PHOTO_ABOUT')}</Typography>
                    <TextArray onChange={setAbout} name='about' value={about} maxSize='1000' ></TextArray>
                </Box>

                <Box p={2} className="cp_main">
                    <Typography variant="h5" gutterBottom>{getText('TEXT_PRODUCT_MOD')}</Typography>

                    <Box p={2} >
                        {productModList.map((item, key) =>
                            <Box sx={{ marginBottom: '20px' }} key={item.listId} display="flex" alignItems="center" justifyContent="space-between">
                                <TextField
                                    fullWidth
                                    value={modifiersStore.data.filter(i => i.id === item.modId)[0]['name']}
                                    label={getText('TEXT_ADD_MOD_FOR_PR_LABEL_1')}
                                    disabled
                                    sx={{ marginRight: '10px' }}
                                />
                                <TextField
                                    fullWidth
                                    value={modifiersStore.data.filter(i => i.id === item.modId)[0]['list'].filter(i => i.id === item.listId)[0]['name']}
                                    label={getText('TEXT_ADD_MOD_FOR_PR_LABEL_2')}
                                    disabled
                                    sx={{ marginRight: '10px' }}
                                />
                                <TextField
                                    fullWidth
                                    value={item.count}
                                    label={getText('TEXT_COUNT_PR')}
                                    sx={{ marginRight: '10px' }}
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        }
                                    }}
                                    onChange={e => handlerChangeItemListModCount(e, item.listId)}

                                />

                                <FormControl fullWidth sx={{ minWidth: 150, marginRight: '10px' }}>
                                    <InputLabel htmlFor={"price-box" + key}>{getText('TEXT_PRICE_PRODUCT')}</InputLabel>
                                    <OutlinedInput
                                        id={"price-box" + key}
                                        startAdornment={<InputAdornment position="start">{currencyIcon}</InputAdornment>}
                                        label={getText('TEXT_PRICE_PRODUCT')}
                                        value={item.price}
                                        onChange={e => handlerChangeItemListModPrice(e, item.listId)}

                                    />
                                </FormControl>

                                <DelIconBtn handler={() => {
                                    handlerRemoveItemListMod(item.listId)
                                }} />
                            </Box>
                        )}
                    </Box>

                    <Box display='flex' justifyContent='center'>
                        <AddBtn onClick={handlerMod} disabled={modifiersStore.data.length > 0 ? false : true} ></AddBtn>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductsAdd;