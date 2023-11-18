import { useContext} from 'react';
import AuthContext from './auth-context';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './updatetodos.css';

function UpdateTodo(props){

    const authCtx=useContext(AuthContext);
    const token=authCtx.token;
    console.log("---------->"+props.updTodo.id);
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


    function updateTodos(props){
       
      console.log("---------->"+props.updTodo.id);
      const config = {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(state)
      };
      config.headers['Authorization'] = `Token ${token}`;
      
      //e.preventDefault()
        var url = `http://127.0.0.1:8000/updatetodo/${props.updTodo.id}`
    
        fetch(url, 
          config
        )
        .then(response => response.json())
        .then(response => {
          
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });

        authCtx.todoCount(countRefresh-1);
        
      }
    
        return(
        <div className='updateform'>
        <label for="title">Update the todo:</label>
        <div><input type='text' onChange={handleChange} name='title' value={state.title}></input></div>
        <button onClick={()=>  updateTodos(props)  }>Update Todo</button> 
        </div>  
        )
    
}
export default UpdateTodo;