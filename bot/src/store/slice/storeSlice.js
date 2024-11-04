 
 import { createSlice } from '@reduxjs/toolkit';
 
 const storeSlice = createSlice({
    name: 'store',
    initialState: {
        status: null,
        error: null,
        currency: 'UAH',
        categorys: [],
        products: [],
        banners: [],
    },
    reducers: {

        edit( state, action ){
            
        }
    }

   

});

export const { edit } = storeSlice.actions;

export default storeSlice.reducer;