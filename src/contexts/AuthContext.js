import React, { createContext, useContext, useState } from 'react'

const contextApi = createContext();

export const useContextApi = () => useContext(contextApi);

const AuthContext = ({ children }) => {

    const [error, setError] = useState('');

    const setErrorCallback = (error) =>{
        setError(error);
    }

    return (
        <contextApi.Provider value={{error, setErrorCallback}}>
            {children}
        </contextApi.Provider>
    )
}

export default AuthContext
