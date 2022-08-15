import { useEffect } from 'react';
import { useSelector } from 'react-redux'

import { Router } from "./components/Router"

import { Header } from './components/Header/Header';
import "./App.scss"


function App() {

  // const isAuth = useSelector(state => state.auth.isAuth)

  // useEffect(() => {

  // }, [])

  return (
    <div className="App">
      <Header />
      <div className="content container" >
        <Router />
      </div>
    </div>
  );
}

export default App;
