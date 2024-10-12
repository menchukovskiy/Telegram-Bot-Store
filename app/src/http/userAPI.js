import { $host, $authHost } from './index'
import { jwtDecode } from 'jwt-decode'


export const registration = async ( email, password, password2, login ) => {
    const {data} = await $host.post( 'api/user/registration', { email, password, password2, login, type: 'USER' } )
    localStorage.setItem( 'token', data.token )
    return jwtDecode(data.token)
}

export const login = async ( email, password ) => {
    const {data} = await $host.post( 'api/user/login', { email, password } )
    localStorage.setItem( 'token', data.token )
    return {
        token : jwtDecode(data.token),
        balance: data.balance,
        package: data.package
    }
}

export const check = async ( ) => {

    if( localStorage.getItem('token') ){
        try{
            const {data} = await $authHost.get( 'api/user/auth' )
            localStorage.setItem( 'token', data.token )
            return {
                token : jwtDecode(data.token),
                balance: data.balance,
                package: data.package
            }
        } catch(e){
            return false
        }
    }
    
}