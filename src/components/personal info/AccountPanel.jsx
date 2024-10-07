import React, {useContext, useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";

export const AccountPanel = () => {
    const { clearChatContext } = useContext(ChatContext)

    const [usernameInput, setUsernameInput] = useState('')
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false)
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

    const {userId: loggedInUserId, setUserId: setLoggedInUserId} = useContext(LoginContext)
    const {fetchUser, deleteUser, changeUsername} = useUserApi()
    const [userData, setUserData] = useState({
        userId: null,
        password: null,
        photoURL: null,
        name: null,
        joinDate: null
    })

    useEffect(() => {
        const formatDate = ( response ) => {
            const date = new Date(response.data.joinDate);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            response.data.joinDate = date.toLocaleDateString('en-US', options);
        }

        const fetchUserData = async () => {
            const response = await fetchUser()
            if (response.status === 200) {
                formatDate(response)
                setUserData(response.data)
            }
        }

        fetchUserData()
    }, [loggedInUserId]);

    const apiChangeUsername = async () => {
        const response = await changeUsername(usernameInput)
        if (response.status === 200){
            setUserData((prev) => ({
                ...prev,
                name: usernameInput,
            }))
        }
    }

    const apiDeleteUser = async () => {
        const response = await deleteUser()
        if (response.status === 200){
            setLoggedInUserId(null)
        }
    }

    const toggleChangeUsername = () => {
        setIsChangeUsernameOpen(!isChangeUsernameOpen)
    }

    const toggleDeleteAccount = () => {
        setIsDeleteAccountOpen(!isDeleteAccountOpen)
    }

    return (
        <>
            <img className="photo"
                 src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"
                 alt="Photo of this user"/>
            <div className="credentials">
                <h3 className="name">{userData.name}</h3>
                <p className="userID">{userData.userId}</p>
            </div>
            <div className="member-since-container">
                <h5 className="header">Member Since</h5>
                <p className="date">{userData.joinDate}</p>
            </div>

            <div className="options-container">
                <h5 className="header">User Options</h5>
                <div className="username">
                    <p className="text">Change Username</p>
                    <button className="bi bi-caret-right" onClick={() => toggleChangeUsername()}></button>
                </div>
                {
                    isChangeUsernameOpen === false ? null :
                        <div className="edit-username">
                            <input type="text" className="input" placeholder={userData.name} onChange={(e) => setUsernameInput(e.target.value)}></input>
                            <button className="submit" onClick={() => apiChangeUsername()}>Save</button>
                        </div>
                }
                <div className="delete-account">
                    <p className="text">Delete Account</p>
                    <button className="bi bi-caret-right" onClick={() => toggleDeleteAccount()}></button>
                </div>
                {
                    isDeleteAccountOpen === false ? null :
                        <div className="password-prompt">
                            <input type="text" className="input" placeholder="Type your password..."></input>
                            <button className="submit" onClick={() => apiDeleteUser()}>Confirm</button>
                        </div>
                }
            </div>
            <div className="logout-button-container">
                <button className="logout-button" onClick={() => { setLoggedInUserId(null); clearChatContext();}}>Logout</button>
            </div>
        </>
    )
}