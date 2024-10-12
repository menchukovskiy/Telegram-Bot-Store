import { $host, $authHost } from './index'


export const getAllCategory = async () => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.get( 'api/category/all' )
            return data
        } catch(e){
            return false
        }
    }
}

export const addCategory = async ( name, parents ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.post( 'api/category/add', { name, parents } )
            return data
        } catch(e){
            return false
        }
    }
}

export const removeCategory = async ( id ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.delete( 'api/category/' + id )
            return data
        } catch(e){
            return false
        }
    }
}

export const editCategory = async ( id, name ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.put( 'api/category/' + id, {name} )
            return data
        } catch(e){
            return false
        }
    }
}

export const addModifiers = async ( name, list ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.post( 'api/modifiers/add', { name, list } )
            return data
        } catch(e){
            return false
        }
    }
}

export const getAllModifiers = async () => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.get( 'api/modifiers/all' )
            return data
        } catch(e){
            return false
        }
    }
}

export const removeModifiers = async ( id ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.delete( 'api/modifiers/' + id )
            return data
        } catch(e){
            return false
        }
    }
}

export const removeItemMod = async ( id ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.delete( 'api/modifiers/item/' + id )
            return data
        } catch(e){
            return false
        }
    }
}

export const editModifiers = async ( id, name, list ) => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.put( 'api/modifiers/' + id, {name, list} )
            return data
        } catch(e){
            return false
        }
    }
}

export const getProductsList = async ( page, limit, category ) => {
    if( localStorage.getItem('token') ){
        
        try{
            const {data} = await $authHost.get( 'api/product/all', { params: {
            page, limit, category
        }} )
            return data
        } catch(e){
            return false
        }

    }
}

export const createProduct = async ( formData ) => {
    if( localStorage.getItem('token') ){
        try{
            const { data } = await $authHost.post( 'api/product/create', formData )
            return data
        } catch(e){
            return false
        }
    }

}

export const changeProductPublic = async ( id, publicProduct ) => {
    if( localStorage.getItem('token') ){
        try{
            const { data } = await $authHost.put( 'api/product/public', { id, publicProduct } )
            return data
        } catch(e){
            return false
        }
    }
}
