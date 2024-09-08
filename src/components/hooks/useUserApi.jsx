import React, {useContext} from 'react';
import {useApi} from "./useApi.js";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

export const useUserApi = () => {
    const { userId: loggedInUserId } = useContext(LoginContext);
    const { callApi } = useApi()

    const fetchUser = async () => {
        return await callApi(`http://localhost:5046/api/User/GetUser/${loggedInUserId}`);
    }

    const changeUsername = async ( username ) => {
        return await callApi(`http://localhost:5046/api/User/ChangeUsername/${loggedInUserId}/${username}`, { method: 'PUT' });
    }

    const loginUser = async (userId, password) => {
        return await callApi(`http://localhost:5046/api/User/LoginUser/${userId}/${password}`, { method: 'POST' })
    }

    const createUser = async (displayname, username, password) => {
        return await callApi(`http://localhost:5046/api/User/CreateUser/`, { method: 'POST', data: {
                userId: username,
                password: password,
                name: displayname
            }})
    }

    const deleteUser = async () => {
        return await callApi(`http://localhost:5046/api/User/DeleteUser/${loggedInUserId}`, { method: 'DELETE' });
    }

    return {
        fetchUser,
        loginUser,
        createUser,
        deleteUser,
        changeUsername
    }
}