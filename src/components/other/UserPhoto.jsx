import React, {useContext, useEffect, useState} from 'react';
import {STATUS} from "../sidebar/chat tabs/STATUS.js";
import {useStatus} from "../hooks/useStatus.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import placeholder from "/src/assets/profile picture placeholder.jpg"

export const Userphoto = ({ photoURL, userId, style }) => {

    const { setUserId, userStatus } = useStatus()
    const [ statusColor, setStatusColor ] = useState('gray')
    const { changedProfilePicture } = useContext(FriendContext)
    const [ currentPictureURL, setCurrentPictureURL ] = useState(photoURL)

    useEffect(() => {
        setUserId(userId)
    }, [userId]);

    useEffect(() => {
        if (userStatus === STATUS.ONLINE)
            setStatusColor('green')
        else setStatusColor('gray')
    }, [userStatus]);

    useEffect(() => {
        if (changedProfilePicture != null && changedProfilePicture.userId === userId){
            setCurrentPictureURL(changedProfilePicture.imageURL)
        }
    }, [changedProfilePicture]);

    return (
        <>
            <img className="photo"
                 src={currentPictureURL === 'none' || currentPictureURL == null ? placeholder : currentPictureURL}
                 alt="Photo of this user"
            />
            <div className="user-status" style={ {background: statusColor, ...style }}></div>
        </>
    )
}