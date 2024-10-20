import React, {useContext, useEffect, useState} from 'react';
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import {STATUS} from "../sidebar/chat tabs/STATUS.js";
import useFriendApi from "../hooks/useFriendApi.jsx";

export const Userphoto = ({ photoURL, userId, style }) => {

    const { fetchOnlineStatus } = useFriendApi()
    const { friendStatusNotification } = useContext(FriendContext)
    const [ statusColor, setStatusColor ] = useState('gray')

    useEffect(() => {
        const getOnlineStatus = async () => {
            const response = await fetchOnlineStatus(userId)
            if (response.status === 200)
                setStatusColor('green')
            else
                setStatusColor('gray')
        }
        getOnlineStatus()
    }, []);

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