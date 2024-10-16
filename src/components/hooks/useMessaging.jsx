import { useState, useEffect, useContext } from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {LoginContext} from "/src/Contexts/LoginContext.jsx";

function useMessaging (openChatTab, checkChatTabExists, createNewChatTab, incrementUnreadMessages) {
    const [socketUrl, setSocketUrl] = useState(null)
    const [friendRequestResponse, setFriendRequestResponse] = useState(null)
    const [messageHistory, setMessageHistory] = useState([])
    const [lastChatMessage, setLastChatMessage] = useState(null)
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {share: true})
    const { userId: loggedInUserId, token: token } = useContext(LoginContext)

    const CHAT_HISTORY = 'chatHistory'
    const CHAT_MESSAGE = 'chatMessage'
    const ACCEPT_FRIENDREQUEST = 'acceptedFriendRequest'
    const DECLINE_FRIENDREQUEST = 'declinedFriendRequest'

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
        if (loggedInUserId != null && token != null) {
            setSocketUrl(`ws://localhost:5046/ws?userID=${loggedInUserId}&token=${token}`);
        }
    }, [loggedInUserId, token]);

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

        const processIncomingHistory = () => {
            setMessageHistory(messageHistory.concat(lastJsonMessage.messages))
        }

        const processIncomingMessage = () => {
            const message = lastJsonMessage.chatMessage;
            const name = message.name
            const senderId = message.senderId
            const photoURL = message.photoURL

            if (checkChatTabExists(senderId) === false){
                createNewChatTab(senderId, name, photoURL, false, 1)
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

        else if (lastJsonMessage.type === ACCEPT_FRIENDREQUEST
            || lastJsonMessage.type === DECLINE_FRIENDREQUEST){
            setFriendRequestResponse(lastJsonMessage)
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
            token: token,
            type: CHAT_MESSAGE
        }

        sendJsonMessage(messageData)
        addMessageToHistory(messageData)
    }

    const addMessageToHistory = (message) => {
        setLastChatMessage(message)
    }

    const clearMessageHistory = () => {
        setMessageHistory([])
    }

    return {
        readyState,
        messageHistory,
        setMessageHistory,
        friendRequestResponse,
        lastMessage: lastChatMessage,
        setLastMessage: setLastChatMessage,
        processOutgoingMessage,
        requestMessageHistory,
        clearMessageHistory
    }

}

export default useMessaging