import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBot } from '../../http/botAPI'

export const getInfo = createAsyncThunk(
    'bot/getInfo',
    async function () {
        try {
            const data = await getBot()
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)


const setDefault = (state) => {
    state.status = null;
    state.error = null;
}


const botSlice = createSlice({
    name: 'bot',
    initialState: {
        status: null,
        error: null,
        name: '',
        token: '',
        id: 0,
        description: '',
        currency: 'UAH',
        public: 0
    },
    reducers: {

        edit( state, action ){
            
        }
    },

    extraReducers: builder => {
        builder

        .addCase(getInfo.fulfilled, (state, action) => {
            setDefault( state )
            state.name = action.payload[0].name
            state.token = action.payload[0].token
            state.id = action.payload[0].id
            state.description = action.payload[0].description
            state.currency = action.payload[0].currency
            state.public = action.payload[0].public
            state.status = 'load'
        })
    }

   

});

export const { edit } = botSlice.actions;

export default botSlice.reducer;