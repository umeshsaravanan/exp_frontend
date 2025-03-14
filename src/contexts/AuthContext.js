import React, { createContext, useContext, useState } from 'react'

const contextApi = createContext();

export const useContextApi = () => useContext(contextApi);

const AuthContext = ({ children }) => {

    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    const setErrorCallback = (error) =>{
        setError(error);
    }

    const setUsernameCallback = (name) =>{
        setUsername(name);
    }

    return (
        <contextApi.Provider value={{username, error, setErrorCallback, setUsernameCallback}}>
            {children}
        </contextApi.Provider>
    )
}

export default AuthContext
