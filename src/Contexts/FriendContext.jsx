import React, {createContext, useContext, useEffect, useState} from 'react';
import useWebSocket from "react-use-websocket";
import {LoginContext} from "./LoginContext.jsx";
import {ChatContext} from "./ChatContext.jsx";
import {MESSAGE_TYPES} from "./MESSAGE_TYPES.js";

export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendRequestRespondedNotification, setFriendRequestRespondedNotification] = useState(null);
    const [friendRequestReceivedNotification, setFriendRequestReceivedNotification] = useState(null);
    const [friendRemovedNotification, setFriendRemovedNotification] = useState(null);
    const [friendStatusNotification, setFriendStatusNotification] = useState(null);

    const { userId: loggedInUserId, token: token } = useContext(LoginContext)
    const { removeChatTab } = useContext(ChatContext)

    const [socketUrl, setSocketUrl] = useState(null)
    const {lastJsonMessage, sendJsonMessage} = useWebSocket(socketUrl, {share: true})

    useEffect(() => {
        if (loggedInUserId != null && token != null)
            setSocketUrl(`ws://localhost:5046/ws?userID=${loggedInUserId}&token=${token}`);
    }, [loggedInUserId, token]);

    useEffect(() => {
        if (lastJsonMessage == null)
            return

        switch (lastJsonMessage.type) {
            case MESSAGE_TYPES.FRIEND_REQUEST_RECEIVED:
                setFriendRequestReceivedNotification(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_REQUEST_RESPONSE:
                setFriendRequestRespondedNotification(lastJsonMessage)
                return
            case MESSAGE_TYPES.REMOVE_FRIEND:
                setFriendRemovedNotification(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_STATUS:
                setFriendStatusNotification(lastJsonMessage)
                return
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (friendRemovedNotification != null)
            removeChatTab(friendRemovedNotification.userId)
    }, [friendRemovedNotification]);

    const shareStatus = (status) => {
        sendJsonMessage({
            userId: loggedInUserId,
            token: token,
            status: status,
            type: MESSAGE_TYPES.FRIEND_STATUS
        })
    }

    return(
        <FriendContext.Provider value={{
            friendRequestRespondedNotification,
            friendRequestReceivedNotification,
            friendRemovedNotification,
            friendStatusNotification,
            shareStatus
        }}>
            {children}
        </FriendContext.Provider>
    )
}