import axios from 'axios';
import React, { createContext, useContext } from 'react';

const axiosContext = createContext();

const useAxiosInstance = () => useContext(axiosContext);

const AxiosContext = ({ children }) => {

    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const excludedEndpoints = ['/login', '/register', '/google'];

    axiosInstance.interceptors.request.use((config) => {
        const isExcluded = excludedEndpoints.some(endpoint =>
            config.url.includes(endpoint)
        );

        if (!isExcluded) {
            config.withCredentials = true;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    return (
        <axiosContext.Provider value={axiosInstance}>
            {children}
        </axiosContext.Provider>
    );
};

export { AxiosContext as default, useAxiosInstance };
