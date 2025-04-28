import axios from 'axios';
import React, { createContext, useContext } from 'react';

const axiosContext = createContext();

export const useAxiosInstance = () => useContext(axiosContext);

const AxiosContext = ({ children }) => {

    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return (
        <axiosContext.Provider value={{ axiosInstance }}>
            {children}
        </axiosContext.Provider>
    );
};

export default AxiosContext;
