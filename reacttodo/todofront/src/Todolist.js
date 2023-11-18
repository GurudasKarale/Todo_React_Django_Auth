import { useContext} from 'react';
import AuthContext from './auth-context';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteTodo from './deleteTodo';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import './todolist.css';

function TodoList(){

    const authCtx=useContext(AuthContext);
    const isLoggedIn=authCtx.isLoggedIn;
    const token=authCtx.token;
    const countRefresh=authCtx.todoCount;
    const [todoS, setTodos] = useState([])
    const history = useHistory();

    console.log(isLoggedIn);
    console.log(token);

    useEffect(() => {
      getTodo();
    },[countRefresh]);

    function appLogout(e){

      const config = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      config.headers['Authorization'] = `Token ${token}`;
      
      //e.preventDefault()
        var url = 'http://127.0.0.1:8000/logout/'
    
        fetch(url, 
          config
        )
        .then(() => {
        
          console.log("null");
          authCtx.logout(null)
          history.push("/");
        }
          //setTodos(response);
          /*localStorage.setItem('token',response.token)*/ 
          // console.log(response)
        )
        .catch(err => {
          console.log(err);
        });

    }
    
    function getTodo(e){
        
      const config = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      config.headers['Authorization'] = `Token ${token}`;
      
      //e.preventDefault()
        var url = 'http://127.0.0.1:8000/todos/'
    
        fetch(url, 
          config
        )
        .then(response => response.json())
        .then(response => {
          
          
          setTodos(response);
          /*localStorage.setItem('token',response.token)*/ 
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    
        authCtx.todoCount(todoS.length);
      }
    
    if(!isLoggedIn){

        return(

            <div>not logged in</div>
        )
    }
    else{
        return(
        <>
        <div className="TodoWrapper">
        <div className="placeLogout">
        {/* <div>You are currently Logged in</div> */}
        <button onClick={appLogout}>Logout</button>
        </div>
        <AddTodo/>
            <div className="Todo">
            
            {todoS.map(todoo => { return( <div key={todoo.id} className="EachItem"> <div className='todotitle'> {todoo.title} </div>
            <div><DeleteTodo passTodo={todoo}/></div> <div><UpdateTodo updTodo={todoo}/></div>  </div>  ) } )  }
            </div>    
        </div>

        </>  
        )
        
    }
        
    

}
export default TodoList;