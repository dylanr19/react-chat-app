import React, {useContext, useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import {ChangePictureOption} from "./ChangePictureOption.jsx";
import {ChangeDisplaynameOption} from "./ChangeDisplaynameOption.jsx";
import {DeleteAccountOption} from "./DeleteAccountOption.jsx";

export const AccountPanel = () => {
    const {userId: loggedInUserId, setUserId: setLoggedInUserId} = useContext(LoginContext)
    const { clearChatContext } = useContext(ChatContext)
    const {fetchUser} = useUserApi()

    const [imageURL, setImageURL] = useState('');
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

    useEffect(() => {
        setImageURL(userData.photoURL)
    }, [userData]);

    return (
        <>
            <div className="account-panel">
                <img className="photo"
                     src={imageURL === 'none' || imageURL == null ? 'src/assets/profile picture placeholder.jpg' : imageURL}
                     alt="Photo of this user"
                />
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
                    <ChangePictureOption setImageURL={setImageURL} setUserData={setUserData}></ChangePictureOption>
                    <ChangeDisplaynameOption userData={userData} setUserData={setUserData}></ChangeDisplaynameOption>
                    <DeleteAccountOption setLoggedInUserId={setLoggedInUserId}
                                         clearChatContext={clearChatContext}></DeleteAccountOption>
                </div>

                <div className="logout-button-container">
                    <button className="logout-button" onClick={() => {
                        setLoggedInUserId(null);
                        clearChatContext();
                    }}>Logout
                    </button>
                </div>
            </div>
        </>
    )
}