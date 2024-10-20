import React, {useEffect, useState} from 'react';
import {STATUS} from "../sidebar/chat tabs/STATUS.js";
import {useStatus} from "../hooks/useStatus.jsx";

export const Userphoto = ({ photoURL, userId, style }) => {

    const { setUserId, userStatus } = useStatus()
    const [ statusColor, setStatusColor ] = useState('gray')

    useEffect(() => {
        setUserId(userId)
    }, [userId]);

    useEffect(() => {
        if (userStatus === STATUS.ONLINE)
            setStatusColor('green')
        else setStatusColor('gray')
    }, [userStatus]);

    return (
        <>
            <img className="photo"
                 src={photoURL === 'none' || photoURL == null ? 'src/assets/profile picture placeholder.jpg' : photoURL}
                 alt="Photo of this user"
            />
            <div className="user-status" style={ {background: statusColor, ...style }}></div>
        </>
    )
}