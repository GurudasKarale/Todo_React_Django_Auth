import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoList from './Todolist';
import login from './login';
import Login from './login';


function App(){


  return(

    <div className='App'>
    <Router>
    <Switch>
    <Route exact path='/' component={Login}/>
    <Route path="/todolist">
      <TodoList/>
    </Route>
    
    </Switch>
    </Router>
    
    </div>
  );
}

 export default App;