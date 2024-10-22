import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsList, createProduct, changeProductPublic, removeProductById, getListModForProduct, getProductById, editProductById } from '../../http/productAPI'

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async function ( [ page = 1, limit = 10, category = 0, order = 'id', sort = 'DESC' ], {dispatch} ) {
      
       try {
            const data = await getProductsList( page, limit, category, order, sort )
            //dispatch(setDataPegNav( { page, limit, category}));
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
        
    }
)
 
export const addProduct = createAsyncThunk(
    'product/addProducts',
    async function ( formData ) {
       
       try {
            const data = await createProduct( formData )
            
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
        
    }
)

export const changePublic = createAsyncThunk(
    'product/changePublic',
    async function ( [ id, publicProduct ], {rejectWithValue, dispatch} ) {
        
       try {
            const data = await changeProductPublic( id, publicProduct )
            dispatch(editOnePublic( { id, public: data.public}));
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
            
        
    }
)

export const removeProduct = createAsyncThunk(
    'product/removeProduct',
    async function ( [id, pegData] ) {

       try {
            const data = await removeProductById( id, pegData )
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const copyProduct = createAsyncThunk(
    'product/copyProduct',
    async function ( id, {dispatch} ) {
        dispatch(copy(id))
       try {
            const data = await getListModForProduct( id )
            
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const getEditProduct = createAsyncThunk(
    'product/getEditProduct',
    async function ( id, {dispatch} ) {
        
       try {
            const data = await getProductById( id )
            //dispatch(editOne(data))
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const editProduct = createAsyncThunk(
    'product/editProduct',
    async function ( [ id, formData ], {dispatch} ) {
        
       try {
            const data = await editProductById( id, formData )
            console.log(data)
            //dispatch(editOne(data))
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'error';
    state.error = action.error.message;
}

const setDefault = (state) => {
    state.status = null;
    state.error = null;
}

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        count: 0,
        countAll: 0,
        limit: 10,
        page: 1,
        category: 0,
        order: 'name',
        sort: 'ASC',
        status: null,
        error: null,
        copyId: 0,
        copyModList: [],
        editData: [],
        editStatus: false
    },
    reducers: {

        setDataPegNav( state, action ){
            state.limit = action.payload.limit
            state.page = action.payload.page
            state.category = action.payload.category
        },

        copy( state, action ){
            state.status = "copy"
            state.copyId = action.payload
        },

        editOnePublic( state, action ){
            const productItem = state.data.find(category => category.id === action.payload.id);
            productItem.public = action.payload.public;
        },

        editOne( state, action ){
            state.editData = action.payload
        },

        setPage( state, action ){
            state.page = action.payload
        },

        setCategory( state, action ){
            state.category = action.payload
            state.page = 1
        },

        setLimit( state, action ){
            state.limit = action.payload
            state.page = 1
        },

        setOrders( state, action ){
            state.order = action.payload.order
            state.sort = action.payload.sort
        }
    },

    extraReducers: builder => {
        builder

        .addCase(getProducts.fulfilled, (state, action) => {
            setDefault( state )
            state.data = action.payload.rows
            state.count = action.payload.count
            state.status = 'load'
            state.countAll = action.payload.countAll
        }) 

        .addCase(getProducts.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(getProducts.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(addProduct.fulfilled, ( state, action ) => {
            setDefault( state )
            state.status = 'load'
        })

        .addCase(addProduct.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(addProduct.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(changePublic.fulfilled, ( state, action ) => {
            setDefault( state )
            state.status = 'load'
        } )

        .addCase(changePublic.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(changePublic.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(removeProduct.fulfilled, ( state, action ) => {
            setDefault( state )
            state.data = action.payload.rows
            state.count = action.payload.count
            const pageCount = Math.ceil( state.count / state.limit )
            if( pageCount < state.page ){
                state.page = pageCount
            }
            state.status = 'load'
        } )

        .addCase(removeProduct.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(removeProduct.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase( copyProduct.fulfilled, ( state, action ) => {
            state.copyModList = []
            if( action.payload.length ){
                action.payload.forEach( mod => {
                    state.copyModList.push({
                        modId: mod.id_modifiers, 
                        listId: mod.value, 
                        count: mod.count, 
                        price: mod.price,
                        id: mod.id
                    })
                } )
            }
        } )

        .addCase(copyProduct.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(copyProduct.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase( getEditProduct.fulfilled, (state, action)  => {
            if( !action.payload ){
                state.status = 'error';
            } else {
                state.editData = action.payload
                state.editStatus = true
            }
        })

        .addCase(getEditProduct.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(getEditProduct.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase( editProduct.fulfilled, (state, action)  => {
           
        })

        .addCase( editProduct.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(editProduct.rejected, (state, action) => {
            setError(state, action)
        })
    }

   

});

export const { editOnePublic, editOne, copy, setPage, setCategory, setLimit, setOrders, setDataPegNav, getPegNavData } = productSlice.actions;

export default productSlice.reducer;