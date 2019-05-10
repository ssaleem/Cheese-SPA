import React from 'react';
import {Route} from 'react-router-dom';
import Cheese from './components/cheese';
import Category from './components/category';
import Menu from './components/menu';
import NavBar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => (
  <>
    <NavBar/>
    <Route exact path="/" component={Main} />
    <Route path="/cheeses" component={Cheese} />
    <Route path="/categories" component={Category} />
    <Route path="/menus" component={Menu} />
    <Footer/>
  </>
)

export default App;
