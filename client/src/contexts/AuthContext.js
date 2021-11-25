import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { authReducer } from "../redux/reducers/authReducer";
import { apiUrl, apiUrlAuth, LOCAL_STORAGE_TOKEN_NAME } from "./Constants";
import { GLOBALTYPES } from "../redux/reducers/globalTypes";

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
                    type: GLOBALTYPES.SET_AUTH,
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

    const upFirebase = async (type, uploadForm) => {
        const formData = new FormData();
        formData.append(type, uploadForm);

        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/song/upfirebase`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

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

    const upMongo = async uploadForm => {
        try {
            const response = await axios.post(`${apiUrl}/song/upload`, uploadForm);
            if (response.data.success) {
                console.log(response.data);
                return response.data;
            }
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

    const uploadSongs = async uploadForm => {
        try {
            const firebaseData = await upFirebase('song', uploadForm.song);
            if (firebaseData.success) {
                const uploadMongo = {
                    title: uploadForm.title,
                    genre: uploadForm.genre,
                    urlAudio: firebaseData.url,
                }

                const mongoData = await upMongo(uploadMongo);
                if (mongoData.success) {
                    console.log(mongoData);
                    return mongoData;
                }
            }

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

    // get user's songs
    const getUserSongs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/song/getUserSongs`);
            if (response.data.success) {
                console.log(response.data);
                return response.data.songs;
            }
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
    const authContextData = { loginUser, registerUser, logoutUser, uploadSongs, getUserSongs, authState };

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;