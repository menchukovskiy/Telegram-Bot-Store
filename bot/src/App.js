import React, { useEffect } from 'react'

import './App.css';
import BottomNavBar from './components/BottomNavBar';
import { BrowserRouter } from 'react-router-dom';
import BotRouter from './router'
function App() {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    tg.expand()
    tg.ready();
  }, [tg])

  return (
    <BrowserRouter>
      <BotRouter />
      <BottomNavBar />
    </BrowserRouter>
  );
}

export default App;
