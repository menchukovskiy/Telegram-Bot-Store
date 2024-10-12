import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import { observer } from "mobx-react-lite"
import { check } from './http/userAPI'
import {Spinner} from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { setUser } from './store/slice/userSlice'
import PreLoad from './components/PreLoad';

const App = observer( () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    check().then(data => {
        if( data ){
          dispatch( setUser({
            balance : data.balance,
            package: data.package,
            token: data.token
          }) )
        }
    }).finally(() => setLoading(false))

}, [dispatch])

if (loading) {
    return <PreLoad/>
}

   
  return (
    <BrowserRouter>
      
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
