import logo from './logo.svg';
import './App.css';
import React, { useContext, useState } from 'react';
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/*import TodoList from './Todolist';*/
import AuthContext from './auth-context';
import { useHistory } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {

  const [state, setState] = useState({username:"",password:""});
  const authCtx=useContext(AuthContext);
  const history = useHistory();
  //const navigate = useNavigate();
 

  function handleChange (e){

    var value=e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    console.log(state.username)

  }

  function handleSubmit(e){

    e.preventDefault()
    var url = 'http://127.0.0.1:8000/loginAPI/'

    fetch(url, {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type':'application/json',
        
      },
      body:JSON.stringify(state)
    })
    .then(response => response.json())
    .then(response => {
      
      authCtx.login(response.token)
      /*localStorage.setItem('token',response.token)*/ 
      console.log(response.token)
      history.push("/todolist");
    })

    .catch(err => {
      console.log(err);
    });
    

  }

  
  /*const tokenn=localStorage.getItem('token')
  if(tokenn!=null){

    return <Redirect/>
  }*/

 
    return (
      <>
      <div id="form-wrapper">
      
        <form onSubmit={handleSubmit} id="form">
            <div className="form-inner">
            <h2>Login</h2>

            <div className='form-group'>
              <label for="username">Username:</label>
              <input type='text' onChange={handleChange} name='username' value={state.username}></input>
            </div>
            
            <div className='form-group'>
              <label for="password">Password:</label>
              <input type='password' onChange={handleChange} name='password' value={state.lastname}></input>
            </div>
            <div className='form-group'>
              <input type='submit' name='submit' id="submit" ></input>
            </div>
      
            </div>
        </form>
     </div>
    </>
    ) 

  
 
}

export default Login;
