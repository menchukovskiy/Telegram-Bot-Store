import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategory, addCategory, removeCategory, editCategory } from '../../http/productAPI'

export const getAll = createAsyncThunk(
    'category/getAllCategory',
    async function () {
        try {
            const data = await getAllCategory()
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const add = createAsyncThunk(
    'category/add',
    async function ( [name, parents] ) {
        try {
            const data = await addCategory( name, parents )
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const edit = createAsyncThunk(
    'category/edit',
    async function( [ id, name ], {rejectWithValue, dispatch} ){
        try {
            const data = await editCategory( id, name )
            dispatch(editOne({id, name}));
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const remove = createAsyncThunk(
    'category/remove',
    async function ( id, {rejectWithValue, dispatch} ) {
        try {
            const data = await removeCategory( id )
            dispatch(removeOne({id}));
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


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        count: 0,
        status: null,
        error: null,
    },
    reducers: { 
        getCategory(state,action){

        },
        addNew( state, action ){
            state.data.push(action.payload);
        },
        removeOne( state, action ){
            state.data = state.data.filter(data => data.id !== action.payload.id);
        },
        editOne( state, action ){
            const nameCategory = state.data.find(category => category.id === action.payload.id);
            nameCategory.name = action.payload.name;
        }
    },
    extraReducers: builder => {
        builder

        .addCase(getAll.fulfilled, (state, action) => {
            setDefault( state )
            state.data = action.payload
            state.count = action.payload.length
            state.status = 'load'
        })

        .addCase(getAll.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(getAll.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(add.fulfilled, (state, action) => {
            setDefault( state )
            state.data.push(action.payload)
            state.count += 1 
            state.status = 'load'
        })

        .addCase(add.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(add.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(remove.fulfilled, (state, action) => {
            setDefault( state )
            state.count -= 1 
            state.status = 'load'
        })

        .addCase(remove.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(edit.fulfilled, (state, action) => {
            setDefault( state )
            state.status = 'load'
        })

        .addCase(edit.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(edit.rejected, (state, action) => {
            setError(state, action)
        })
    }

   

});

export const { getCategory, removeOne, editOne } = categorySlice.actions;

export default categorySlice.reducer;