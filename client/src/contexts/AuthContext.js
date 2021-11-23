import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, apiUrlAuth, LOCAL_STORAGE_TOKEN_NAME } from "./Constants";

import setAuthToken from "../components/auth/setAuthToken";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        } // add token into default header in axios

        try {
            const response = await axios.get(`${apiUrlAuth}/auth`);
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    }
                });

            } else {
                console.log(response);
            }
        } catch (err) {
            console.log('dang o catch load user');
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                }
            });
        }
    };

    useEffect(() => loadUser(), []);

    // Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrlAuth}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();

            console.log(authState);
            return response.data;
        } catch (err) {
            if (err.response.data) {
                return err.response.data;
            }
            return {
                success: false,
                message: err.message,
            }
        }
    }

    // register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();

            console.log(response.data);
            return response.data;

        } catch (err) {
            if (err.response.data) {
                return err.response.data;
            }
            return {
                success: false,
                message: err.message,
            }
        }
    }

    // logout
    const logoutUser = async () => {
        try {
            const response = await axios.delete(`${apiUrlAuth}/auth/logout`);
            if (response.data.success) {
                console.log(response.data);
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            }
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                }
            });

            console.log(authState);
            return response.data;
            
        } catch (err) {
            if (err.response.data) {
                return err.response.data;
            }
            return {
                success: false,
                message: err.message,
            }
        }
    }

    // context data
    const authContextData = { loginUser, registerUser, logoutUser, authState };

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;