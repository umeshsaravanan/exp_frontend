import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const contextApi = createContext();

export const useContextApi = () => useContext(contextApi);

const AuthContext = ({ children }) => {

    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const isLoggedIn = localStorage.getItem("user");
    const navigate = useNavigate();

    const setErrorCallback = (error) =>{
        setError(error);
    }

    const setUsernameCallback = (name) =>{
        setUsername(name);
    }
    
    useEffect(() =>{
        if(isLoggedIn)
            navigate("/dashboard");
        else
            navigate("/");

    },[isLoggedIn, navigate])

    return (
        <contextApi.Provider value={{username, error, setErrorCallback, setUsernameCallback}}>
            {children}
        </contextApi.Provider>
    )
}

export default AuthContext
