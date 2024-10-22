import React, { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../router'
import { observer } from "mobx-react-lite"
import { useSelector } from 'react-redux'

const AppRouter = observer( () => {
    
    const user = useSelector(state => state.user.user);
    
    return(
        <Routes>
            { user.isAuth && authRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {  publicRoutes.map( ({path, Component}) =>
                <Route key={path} path={path} element={Component} exact />
            )}
            
        </Routes>
        
    )
})

export default AppRouter