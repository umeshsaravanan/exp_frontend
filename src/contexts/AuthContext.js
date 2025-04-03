import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const contextApi = createContext();

export const useContextApi = () => useContext(contextApi);

const AuthContext = ({ children }) => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setErrorCallback = (error) => {
        setError(error);
    }

    const setUsernameCallback = (name) => {
        setUsername(name);
    }

    const setIsAuthenticatedCallback = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
    }

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) return value;
        }
        return null;
    };

    useEffect(() => {
        setError(null);

        const jwtToken = getCookie('jwtToken');

        if (!jwtToken) {
            navigate('/login');
            return;
        }

        const validate = async (jwtToken) => {
            try {

                const { data } = await axios.post('http://localhost:8080/api/validate', {}, {
                    headers: { Authorization: `Bearer ${jwtToken}` }
                })
                if (data !== "Invalid Token") {
                    setUsername(data.username);
                    setIsAuthenticated(true);
                    navigate('/');
                } else {
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            }
            catch (error) {
                console.error(error);
                setIsAuthenticated(false);
                navigate('/login');
            }
        }

        validate(jwtToken);

    //eslint-disable-next-line
    }, [isAuthenticated, error]);

    return (
        <contextApi.Provider value={{ username, error, isAuthenticated, setErrorCallback, setUsernameCallback, setIsAuthenticatedCallback }}>
            {children}
        </contextApi.Provider>
    );
};

export default AuthContext;
