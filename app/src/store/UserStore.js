import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._info = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    setInfo( data ){
        this._info = {
            balance: data.balance,
            package: data.package
        }
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get info() {
        return this._info
    }

}