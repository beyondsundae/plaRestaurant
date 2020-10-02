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
          <Route exact path="/" render={() => (<MenuPage TableNumber="1"/>)}/>
    
          <Route exact path="/Table1" render={() => (<MenuPage TableNumber="1"/>)}/>
          <Route exact path="/Table2" render={() => (<MenuPage TableNumber="2"/>)}/>
          <Route exact path="/Table3" render={() => (<MenuPage TableNumber="3"/>)}/>
          <Route exact path="/Table4" render={() => (<MenuPage TableNumber="4"/>)}/>
          <Route exact path="/Table5" render={() => (<MenuPage TableNumber="5"/>)}/>
          <Route exact path="/back" component={OrderPage} />
          <Route component={MenuPage} />
        </Switch>
    </div>
  );
}

export default App;
