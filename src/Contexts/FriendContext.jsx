import React, {createContext, useContext, useEffect, useState} from 'react';
import useWebSocket from "react-use-websocket";
import {LoginContext} from "./LoginContext.jsx";
import {ChatContext} from "./ChatContext.jsx";
import {MESSAGE_TYPES} from "./MESSAGE_TYPES.js";

export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendRequestResponse, setFriendRequestResponse] = useState(null);
    const [receivedFriendRequest, setReceivedFriendRequest] = useState(null);
    const [removedFriend, setRemovedFriend] = useState(null);
    const [friendStatus, setFriendStatus] = useState(null);

    const { userId: loggedInUserId, token: token } = useContext(LoginContext)
    const { removeChatTab } = useContext(ChatContext)
    const [socketUrl, setSocketUrl] = useState(null)
    const {lastJsonMessage, sendJsonMessage, readyState} = useWebSocket(socketUrl, {
        share: true,

        shouldReconnect: (closeEvent) => true,
        reconnectAttempts: 10,
        //attemptNumber will be 0 the first time it attempts to reconnect,
        // so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds,
        // and then caps at 10 seconds until the maximum number of attempts is reached
        reconnectInterval: (attemptNumber) =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

        heartbeat: {
            message: 'ping',
            returnMessage: 'pong',
            timeout: 60000, // 1 minute, if no response is received, the connection will be closed
            interval: 25000, // every 25 seconds, a ping message will be sent
        },
    })

    const apiURL = import.meta.env.VITE_API_URL_WEBSOCKET

    useEffect(() => {
        if (loggedInUserId != null && token != null)
            setSocketUrl(`${apiURL}/ws?userID=${loggedInUserId}&token=${token}`);
    }, [loggedInUserId, token]);

    useEffect(() => {
        if (lastJsonMessage == null)
            return

        switch (lastJsonMessage.type) {
            case MESSAGE_TYPES.FRIEND_REQUEST_RECEIVED:
                setReceivedFriendRequest(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_REQUEST_RESPONSE:
                setFriendRequestResponse(lastJsonMessage)
                return
            case MESSAGE_TYPES.REMOVE_FRIEND:
                setRemovedFriend(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_STATUS:
                setFriendStatus(lastJsonMessage)
                return
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (removedFriend != null)
            removeChatTab(removedFriend.userId)
    }, [removedFriend]);

    return(
        <FriendContext.Provider value={{
            friendRequestRespondedNotification: friendRequestResponse,
            friendRequestReceivedNotification: receivedFriendRequest,
            friendRemovedNotification: removedFriend,
            friendStatusNotification: friendStatus
        }}>
            {children}
        </FriendContext.Provider>
    )
}