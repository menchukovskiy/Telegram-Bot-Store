import React, {useState} from 'react'

import './App.css';
import BottomNavBar from './components/BottomNavBar';


function App() {
  
  

  const tg = window.Telegram.WebApp;

  console.log(tg)
  

  return (
    <div className="App">
      <BottomNavBar />
    </div>
  );
}

export default App;
