import { useContext} from 'react';
import AuthContext from './auth-context';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './addtodo.css';

function AddTodo(){

    const authCtx=useContext(AuthContext);
    const token=authCtx.token;
    
    const countRefresh=authCtx.todoCount;
    const [state, setState] = useState("");


    function handleChange (e){

        var value=e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
        console.log(state.title)
    
      }


    function addTodos(e){

      
      const config = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(state)
      };
      config.headers['Authorization'] = `Token ${token}`;
      
      //e.preventDefault()
        var url = `http://127.0.0.1:8000/addtodo/`
    
        fetch(url, 
          config,
        )
        .then(response => response.json())
        .then(response => {

          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });

        authCtx.todoCount(countRefresh+1);
        setState("");
    
      }
    
        return(
        <div className='addtodo'>
        <label for="title">Please add new Todos:</label>
        <div><input type='text' onChange={handleChange} name='title' value={state.title}></input></div>
        <button onClick={()=>  addTodos()  }>Add Todo</button> 
        </div>  
        )
    
}
export default AddTodo;