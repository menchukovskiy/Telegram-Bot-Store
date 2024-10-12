import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, registration } from '../../http/userAPI'


export const getLogin = createAsyncThunk(
    'user/getLogin',
    async function ([email, password],{rejectWithValue, dispatch}) {
        try {
            const data = await login(email, password)
           
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const getRegistration = createAsyncThunk(
    'user/getRegistration',
    async function ([email, password, password2, userlogin]) {
        try {
            const data = await registration( email, password, password2, userlogin)
            return data
        } catch (e) {

            throw new Error(e.response.data.message)
        }
    }
)


const setError = (state, action) => {
    console.log(action.error.message)
    state.status = 'error';
    state.error = action.error.message;
}

const setDefault = (state) => {
    state.status = null;
    state.error = null;
}



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:
        {
            isAuth: false,
            info: {
                balance: 0,
                package: {
                    name: '',
                    category_limit: 0,
                    banner_limit: 0,
                    product_limit: 0
                }
            },
            token: null,
            status: null,
        }
        ,
        status: null,
        error: null,
    },
    reducers: {
        setDefaultState(state) {
            setDefault(state)
        },

        setUser(state, action) { 
            state.user.isAuth = true
            state.user.info.balance = action.payload.balance
            state.user.info.package = action.payload.package
            state.user.token = action.payload.token

        },
        removeUser(state) {
            state.user.isAuth = false
            state.user.info.balance = 0
            state.user.info.package = []
            state.user.token = null
            localStorage.removeItem('token')
            setDefault(state)
        }
    },

    extraReducers: builder => {
        builder

            .addCase(getLogin.pending, (state, action) => {
                setDefault(state)
                state.status = 'loading'
            })

            .addCase(getLogin.fulfilled, (state, action) => {
                if (action.payload.token) {
                    state.user.isAuth = true
                    state.user.info.balance = action.payload.balance
                    state.user.info.package = action.payload.package
                    state.user.token = action.payload.token
                    setDefault(state)
                    state.status = 'login'
                }

            })

            .addCase(getLogin.rejected, (state, action) => {
                setError(state, action)
            })

            .addCase(getRegistration.pending, (state, action) => {
                setDefault(state)
                state.status = 'loading'
            })

            .addCase(getRegistration.fulfilled, (state, action) => {
               
                if (action.payload.id) {
                    state.user.isAuth = true
                    state.user.token = action.payload.token
                    setDefault(state)
                    state.status = 'login'
                }

            })

            .addCase(getRegistration.rejected, (state, action) => {
                setError(state, action)
            })

    }

});

export const { setUser, removeUser, setDefaultState } = userSlice.actions;

export default userSlice.reducer;