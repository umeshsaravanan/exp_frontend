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
    const [isValidating, setIsValidating] = useState(false);
    const [lastValidationAttempt, setLastValidationAttempt] = useState(0);

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

    const validateToken = async (jwtToken) => {
        try {
            setIsValidating(true);
            const { data } = await axios.post(
                'http://localhost:8080/api/validate',
                {},
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                    timeout: 5000
                }
            );

            if (data !== "Invalid Token") {
                setUsername(data.username);
                setIsAuthenticated(true);
                setError(null);
            } else {
                setIsAuthenticated(false);
                setError("Session expired");
                navigate('/login');
            }
        } catch (error) {
            console.error("Validation error:", error);

            if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
                setError("Network error - please check your connection");
                // Don't navigate to login on network errors
                // Let the user continue with potentially cached credentials
            } else {
                setIsAuthenticated(false);
                setError("Session validation failed");
                navigate('/login');
            }
        } finally {
            setIsValidating(false);
            setLastValidationAttempt(Date.now());
        }
    };

    useEffect(() => {
        const jwtToken = getCookie('jwtToken');

        if (!jwtToken) {
            navigate('/login');
            return;
        }

        // Throttle validation attempts - don't retry more than once every 10 seconds
        const now = Date.now();
        if (!isValidating && (now - lastValidationAttempt > 10000)) {
            validateToken(jwtToken);
        }

        const intervalId = setInterval(() => {
            if (!isValidating) {
                validateToken(jwtToken);
            }
        }, 60*60*1000);

        return () => clearInterval(intervalId);

        //eslint-disable-next-line
    }, [isAuthenticated, error, isValidating, lastValidationAttempt]);

    return (
        <contextApi.Provider value={{
            username,
            error,
            isAuthenticated,
            isValidating,
            setErrorCallback,
            setUsernameCallback,
            setIsAuthenticatedCallback
        }}>
            {children}
        </contextApi.Provider>
    );
};

export default AuthContext;