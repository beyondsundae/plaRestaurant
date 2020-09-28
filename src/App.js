import React from 'react';
import logo from './logo.svg';
import OrderPage from './Components/OrderPage'
import MenuPage from './Components/MenuPage'
import './App.css';

import { BrowserRouter as HashRouter, Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div style={{height: "100vh"}}>
      <Switch>
          <Route exact path="/" component={MenuPage} />
          <Route exact path="/back" component={OrderPage} />
          <Route component={MenuPage} />
        </Switch>
    </div>
  );
}

export default App;
