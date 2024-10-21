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
    const {lastJsonMessage, sendJsonMessage} = useWebSocket(socketUrl, {share: true})

    useEffect(() => {
        if (loggedInUserId != null && token != null)
            setSocketUrl(`https://backend-dylan.azurewebsites.net/ws?userID=${loggedInUserId}&token=${token}`);
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