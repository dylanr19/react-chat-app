import React, {useContext, useEffect, useState} from 'react';
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import {STATUS} from "../sidebar/chat tabs/STATUS.js";

export const Userphoto = ({ photoURL, userId, style }) => {

    const { friendStatusNotification } = useContext(FriendContext)
    const [ statusColor, setStatusColor ] = useState('gray')

    useEffect(() => {
        if (friendStatusNotification == null) return
        if (friendStatusNotification.userId !== userId) return
        if (friendStatusNotification.status === STATUS.ONLINE)
            setStatusColor('green')
        else setStatusColor('gray')
    }, [friendStatusNotification]);

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