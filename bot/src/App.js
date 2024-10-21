import React, { useEffect } from 'react'

import './App.css';
import BottomNavBar from './components/BottomNavBar';


function App() {



  const tg = window.Telegram.WebApp;

  console.log(tg)
  useEffect(() => {
    tg.expand()
    tg.ready();
  }, [tg])

  return (
    <div className="App">
      <BottomNavBar />
    </div>
  );
}

export default App;
