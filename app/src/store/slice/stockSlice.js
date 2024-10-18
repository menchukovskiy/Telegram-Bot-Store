import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStokcUser, updateStock } from '../../http/productAPI'


export const getStock = createAsyncThunk(
    'stock/getStock',
    async function ( [ category = 0, order = 'id', sort = 'DESC' ], {dispatch} ) {
      
       try {
            const data = await getStokcUser( category, order, sort )
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
        
    }
)

export const addStock = createAsyncThunk(
    'stock/addStock',
    async function ( listAdd ) {
      
       try {
            const data = await updateStock( listAdd )
            
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
        
    }
)

const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        data: [],
        count: 0,
        order: 'name',
        sort: 'ASC',
        category: 0,
        status: null,
        error: null,
    },
    reducers: { 
        setOrders(state,action){
            state.order = action.payload.order
            state.sort = action.payload.sort
        }
    },
    extraReducers: builder => {
        builder

        .addCase(getStock.fulfilled, (state, action) => {
            state.data = action.payload.rows
            state.count = action.payload.count
            state.status = 'load'
        })

        .addCase(addStock.fulfilled, (state, action) => {
            state.status = 'load'
        })

        .addCase(addStock.pending, (state, action) => {
            state.status = 'waiting'
        })

        
    }

});

export const { setOrders } = stockSlice.actions;

export default stockSlice.reducer;