import React, {useContext} from 'react';
import {api} from "./Api.js";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

export const useUserApi = () => {
    const { userId: loggedInUserId } = useContext(LoginContext);
    const { callApi } = api()

    const fetchUser = async () => {
        return await callApi(`http://localhost:5046/api/User/GetUser/${loggedInUserId}`);
    }

    const changeDisplayname = async (username ) => {
        return await callApi(`http://localhost:5046/api/User/ChangeUsername/${loggedInUserId}/${username}`, { method: 'PUT' });
    }

    const uploadProfilePictureToImgbb = async ( formData ) => {
        return await callApi('https://api.imgbb.com/1/upload?key=690b9ff36daaded345c3634167d233a3', {
            method: 'POST',
            data: formData
        });
    }

    const changeProfilePicture = async ( imageURL ) => {
        return await callApi(`http://localhost:5046/api/User/ChangeProfilePicture/${loggedInUserId}/${imageURL}`, { method: 'PUT' })
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
        changeDisplayname: changeDisplayname,
        changeProfilePicture,
        uploadProfilePictureToImgbb
    }
}