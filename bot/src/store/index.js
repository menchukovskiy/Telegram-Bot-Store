import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './slice/storeSlice';

export const store = configureStore({
    reducer: {
        store: storeSlice,
    }
}); 