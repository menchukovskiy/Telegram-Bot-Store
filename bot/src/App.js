import React, {useEffect} from 'react'
import {useTelegram} from "./hooks/useTelegram";
import './App.css';

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
      tg.ready();
  }, [])

  return (
    <div className="App">
      BOT
    </div>
  );
}

export default App;
