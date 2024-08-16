import { useState, useEffect, useContext } from 'react';
import useWebSocket from "react-use-websocket";
import {playNotificationSound, showDesktopNotification} from "../../notificationUtils.js";
import {LoginContext} from "/src/Contexts/LoginContext.jsx";

function useMessaging (chatPartner, createNewPartner, setPartnerLastMessage, getPartnerData) {
    const { loggenInUserId } = useContext(LoginContext)

    const [socketUrl, setSocketUrl] = useState('ws://localhost:5046/ws')
    const [messageHistory, setMessageHistory] = useState([])
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {share: true})

    const CHAT_HISTORY = 'chatHistory'
    const CHAT_MESSAGE = 'chatMessage'
    const REGISTER = 'register'

    // useEffect(() => {
    //     sendJsonMessage({
    //         userId: loggenInUserId,
    //         type: REGISTER,
    //     })
    // }, [loggenInUserId]);

    const requestMessageHistory = (ownId, partnerId) => {
        sendJsonMessage({
            userId1: loggenInUserId,
            userId2: partnerId,
            type: CHAT_HISTORY
        })
    }

    useEffect(() => {
        if (lastJsonMessage == null){
            return
        }

        const isAppMinimized = true;

        const processIncomingHistory = () => {
            const lastMessage = lastJsonMessage.messages.findLast(m => m.senderId === chatPartner.userId)

            setPartnerLastMessage(chatPartner.userId, lastMessage.text)
            setMessageHistory(lastJsonMessage.messages)
        }

        const processIncomingMessage = () => {
            const senderId = lastJsonMessage.senderId
            const text = lastJsonMessage.text
            setPartnerLastMessage(senderId, text)

            if (chatPartner.userId === senderId){
                addMessageToHistory(lastJsonMessage)
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
            // text is empty
            return
        }

        const messageData = {
            photoURL: '',
            senderId: loggenInUserId,
            receiverId: chatPartner.userId,
            text: text,
            delivered: true,
            type: CHAT_MESSAGE
        }

        addMessageToHistory(messageData)

        if (sendJsonMessage(messageData) === false) {
            setMessageNotDelivered('xxx')
        }
    }

    const setMessageNotDelivered = (senderId) => {
        const updatedHistory = [...messageHistory].map(message => {
            if (message.senderId === senderId) {
                return { ...message, delivered: false };
            }
            return message;
        });

        setMessageHistory(updatedHistory);
    };

    const addMessageToHistory = (messageData) => {
        setMessageHistory((prev) => prev.concat(messageData))
    }

    return {
        messageObj: {
            messageHistory,
            setMessageHistory,
            processOutgoingMessage,
            requestMessageHistory
        }
    }

}

export default useMessaging