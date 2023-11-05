import React from 'react';
import {Route} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import './App.css'
import './assets/fonts/iconfont.css'
import Archive from "./components/Archive/Archive";
import Category from "./components/Category/Category";
import Tag from "./components/Tag/Tag";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import TagFilter from "./components/TagFilter/TagFilter";
const App = () => {
  return (
    <>
        <Route exact path='/' component={Home} />
        <Route exact path='/archives' component={Archive}/>
        <Route exact path="/categories" component={Category}/>
        <Route exact path='/tags' component={Tag}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/blogs/:id' component={BlogDetail}/>
        <Route exact path='/tags/:tag' component={TagFilter}/>
        {/*<Route exact path='/categories/:category' component={}/>*/}
    </>
  );
};

export default App;
