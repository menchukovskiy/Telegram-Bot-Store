import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addModifiers, getAllModifiers, removeModifiers, removeItemMod, editModifiers } from '../../http/productAPI'

const setError = (state, action) => {
    state.status = 'error';
    state.error = action.error.message;
}

const setDefault = (state) => {
    state.status = null;
    state.error = null;
}

export const add = createAsyncThunk(
    'modifiers/add',
    async function ( [name, list]) {
        try {
            const data = await addModifiers( name, list )
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const edit = createAsyncThunk(
    'modifiers/edit',
    async function( [ id, name, list ], {rejectWithValue, dispatch} ){
        try {
            const data = await editModifiers( id, name, list )
            
            dispatch(editOne({id: data.id, name: data.name, list: data.list}));

            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const getAllMod = createAsyncThunk(
    'modifiers/getAllMod',
    async function () {
        try {
            const data = await getAllModifiers()
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const removeMod = createAsyncThunk(
    'modifiers/removeMod',
    async function ( id, {rejectWithValue, dispatch} ) {
        try {
            const data = await removeModifiers( id )
            dispatch(removeOne({id}));
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)

export const removeItemListMod = createAsyncThunk(
    'modifiers/removeItemListMod',
    async function ( [ modId, itemId ], {rejectWithValue, dispatch} ) {
        try {
            const data = await removeItemMod( itemId )
            dispatch(removeOneItem({ modId, itemId }));
            return data
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }
)



const modifiersSlice = createSlice({
    name: 'modifiers',
    initialState: {
        data: [],
        count: 0,
        status: null,
        error: null,
        copyId: 0,
        maxCount: 15

    },
    reducers: {
        addNew( state, action ){
            state.data.push(action.payload);
        },
        removeOne( state, action ){
            state.data = state.data.filter(data => data.id !== action.payload.id);
        },
        copyMod( state, action ){
            state.status = "copy"
            state.copyId = action.payload
        },
        editOne( state, action ){
            const updateMod = state.data.find(mod => mod.id === action.payload.id)
            updateMod.name = action.payload.name
            updateMod.list = action.payload.list
        },
        removeOneItem( state, action ){
            
        }
    },
    extraReducers: builder => {
        builder
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

        .addCase(getAllMod.fulfilled, (state, action) => {
            setDefault( state )
            state.data = action.payload
            state.count = action.payload.length
            state.status = 'load'
        })

        .addCase(getAllMod.pending, (state, action) => {
            setDefault( state )
            state.status = 'waiting'
        })

        .addCase(getAllMod.rejected, (state, action) => {
            setError(state, action)
        })

        .addCase(removeMod.fulfilled, (state, action) => {
            setDefault( state )
            state.count -= 1 
            state.status = 'load'
        })

        .addCase(removeItemListMod.fulfilled, (state, action) => {
            setDefault( state )
            state.status = 'load'
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

export const { addNew, removeOne, copyMod, removeOneItem, editOne } = modifiersSlice.actions;

export default modifiersSlice.reducer;