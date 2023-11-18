import React,{useState} from 'react';

const AuthContext=React.createContext(
    {
token:'',
isLoggedIn:false,
login:(token)=>{},
todoCount:0,
    }
);

export const AuthContextPovider=(props)=>{

    const [token, setToken] = useState(null);
    const [todoCount, setCount] = useState(null);

    const userIsLoggedIn=!!token;
    
    const loginHandler=(token)=>{

        setToken(token);
    };

    const logoutHandler=(token)=>{

        setToken(token);
    };
    const countHandler=(todoCount)=>{

        setCount(todoCount);
    };

    const contextValue={

        token: token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        todoCount:countHandler,
        
    };
    return (<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>);
};
export default AuthContext;
