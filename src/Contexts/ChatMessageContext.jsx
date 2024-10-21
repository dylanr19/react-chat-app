import React, {createContext, useContext, useEffect, useState} from 'react';
import {LoginContext} from "./LoginContext.jsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import { MESSAGE_TYPES } from "./MESSAGE_TYPES.js";

export const ChatMessageContext = createContext();

export const ChatMessageProvider = ({ children }) => {
    const { userId: loggedInUserId, token: token } = useContext(LoginContext)

    const [socketUrl, setSocketUrl] = useState(null)
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {share: true});

    const [messageHistory, setMessageHistory] = useState([])
    const [lastSentChatMessage, setLastSentChatMessage] = useState(null)

    useEffect(() => {
        if (loggedInUserId != null && token != null)
            setSocketUrl(`https://backend-dylan.azurewebsites.net/ws?userID=${loggedInUserId}&token=${token}`);
        else
            setSocketUrl(null) //TODO: dit sluit de websocket connectie niet

    }, [loggedInUserId, token]);

    useEffect(() => {
        if (lastJsonMessage != null)
            if (lastJsonMessage.type === MESSAGE_TYPES.CHAT_HISTORY)
                setMessageHistory(messageHistory.concat(lastJsonMessage.messages))
    }, [lastJsonMessage]);

    const clearMessageHistory = () => {
        setMessageHistory([])
    }

    const requestMessageHistory = (friendId, skip, take) => {
        sendJsonMessage({
            userId1: loggedInUserId,
            userId2: friendId,
            skip: skip,
            take: take,
            type: MESSAGE_TYPES.CHAT_HISTORY
        })
    }

    const sendChatMessage = (text, userId) => {
        if (text.trim() === '') {
            return
        }

        const message = {
            senderId: loggedInUserId,
            receiverId: userId,
            text: text,
            token: token,
            type: MESSAGE_TYPES.CHAT_MESSAGE
        }

        sendJsonMessage(message)
        setLastSentChatMessage(message)
    }

    return(
        <ChatMessageContext.Provider value={{
            readyState,
            messageHistory,
            setMessageHistory,
            lastSentChatMessage,
            lastJsonMessage,
            clearMessageHistory,
            sendChatMessage,
            requestMessageHistory,
        }}>
            {children}
        </ChatMessageContext.Provider>
    )
}