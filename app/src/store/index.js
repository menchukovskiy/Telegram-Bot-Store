import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import categorySlice from './slice/categorySlice';
import productSlice from './slice/productSlice'
import modifiersSlice from './slice/modifiersSlice'
import botSlice from './slice/botSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categorySlice,
        product: productSlice,
        modifiers: modifiersSlice,
        bot: botSlice
    }
}); 