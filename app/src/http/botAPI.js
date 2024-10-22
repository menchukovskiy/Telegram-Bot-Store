import { $authHost } from './index'

export const getBot = async () => {
    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.get( 'api/bot' )
            return data
        } catch(e){
            return false
        }
    }
}