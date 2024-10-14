import { useState, useEffect, useContext } from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {playNotificationSound, showDesktopNotification} from "../../notificationUtils.js";
import {LoginContext} from "/src/Contexts/LoginContext.jsx";

function useMessaging (openChatTab, checkChatTabExists, createNewChatTab, incrementUnreadMessages) {
    const [socketUrl, setSocketUrl] = useState(null)
    const [messageHistory, setMessageHistory] = useState([])
    const [lastMessage, setLastMessage] = useState(null)
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {share: true})
    const { userId: loggedInUserId } = useContext(LoginContext)

    const CHAT_HISTORY = 'chatHistory'
    const CHAT_MESSAGE = 'chatMessage'

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        console.log('The WebSocket is currently ' + connectionStatus)
    }, [readyState]);

    useEffect(() => {
        setSocketUrl(`ws://localhost:5046/ws?userID=${loggedInUserId}`)
    }, [loggedInUserId]);

    const requestMessageHistory = (partnerId, skip, take) => {
        sendJsonMessage({
            userId1: loggedInUserId,
            userId2: partnerId,
            skip: skip,
            take: take,
            type: CHAT_HISTORY
        })
    }

    useEffect(() => {
        if (lastJsonMessage == null){
            return
        }

        const isAppMinimized = true;

        const processIncomingHistory = () => {
            // const fullHistory = lastJsonMessage.messages.concat(messageHistory)
            setMessageHistory(messageHistory.concat(lastJsonMessage.messages))
        }

        const processIncomingMessage = () => {
            const message = lastJsonMessage.chatMessage;
            const name = message.name
            const senderId = message.senderId
            const photoURL = message.photoURL

            if (checkChatTabExists(senderId) === false){
                createNewChatTab(senderId, name, photoURL, true, 1)
                incrementUnreadMessages(senderId)
                return
            }

            if (openChatTab != null && openChatTab.userId === senderId){
                addMessageToHistory(message)
            }
            else {
                incrementUnreadMessages(senderId)
            }
        }

        if (lastJsonMessage.type === CHAT_HISTORY) {
            processIncomingHistory()
        }

        else if (lastJsonMessage.type === CHAT_MESSAGE) {
            processIncomingMessage()
        }

        if (isAppMinimized) {
            playNotificationSound()
            showDesktopNotification()
        }

    }, [lastJsonMessage]);

    const processOutgoingMessage = (text) => {
        if (text.trim() === '') {
            return
        }

        const messageData = {
            senderId: loggedInUserId,
            receiverId: openChatTab.userId,
            text: text,
            type: CHAT_MESSAGE
        }

        sendJsonMessage(messageData)
        addMessageToHistory(messageData)
    }

    const addMessageToHistory = (message) => {
        setLastMessage(message)
    }

    const clearMessageHistory = () => {
        setMessageHistory([])
    }

    return {
        readyState,
        messageHistory,
        setMessageHistory,
        lastMessage,
        setLastMessage,
        processOutgoingMessage,
        requestMessageHistory,
        clearMessageHistory
    }

}

export default useMessaging