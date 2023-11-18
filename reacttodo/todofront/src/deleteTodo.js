import { useContext} from 'react';
import AuthContext from './auth-context';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './deletetodo.css';

function DeleteTodo(props){

    const authCtx=useContext(AuthContext);
    const token=authCtx.token;
    console.log("---------->"+props.passTodo.id);
    const countRefresh=authCtx.todoCount;

    function deleteTodos(props){

      console.log("---------->"+props.passTodo.id);
      const config = {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      config.headers['Authorization'] = `Token ${token}`;
      
      //e.preventDefault()
        var url = `http://127.0.0.1:8000/deletetodo/${props.passTodo.id}`
    
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
        <div className='deletetodo'>
        <button onClick={()=>  deleteTodos(props)  }>Delete</button> 
        </div>  
        )
    
}
export default DeleteTodo;