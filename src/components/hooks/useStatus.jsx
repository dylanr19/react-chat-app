import React, {useContext, useEffect, useState} from 'react';
import useFriendApi from "./useFriendApi.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import {STATUS} from "../sidebar/chat tabs/STATUS.js";

export const useStatus = () => {
    const { fetchOnlineStatus } = useFriendApi()
    const { friendStatusNotification } = useContext(FriendContext)

    const [ userStatus, setUserStatus ] = useState('offline')
    const [ userId, setUserId ] = useState(null)

    useEffect(() => {
        const getStatusAsync = async () => {
            const response = await fetchOnlineStatus(userId)
            if (response.status === 200)
                setUserStatus(STATUS.ONLINE)
            else setUserStatus(STATUS.OFFLINE)
        }

        if (userId != null) getStatusAsync()
    }, [userId]);

    useEffect(() => {
        if (friendStatusNotification == null) return
        if (friendStatusNotification.userId !== userId) return
        setUserStatus(friendStatusNotification.status)
    }, [friendStatusNotification]);

    return {
        userStatus,
        setUserId
    }
}