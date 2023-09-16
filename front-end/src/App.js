import React from 'react';
import {Route} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import './App.css'
import './assets/fonts/iconfont.css'

const App = () => {
  return (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
    </div>
  );
};

export default App;
