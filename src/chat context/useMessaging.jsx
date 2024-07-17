import { useState, useEffect } from 'react';
import useWebSocket from "react-use-websocket";
import {playNotificationSound, showDesktopNotification} from "./notificationUtils.js";

function useMessaging ({chatPartner, createNewPartner, setPartnerLastMessage, getPartnerData}) {

    const [socketUrl, setSocketUrl] = useState('wss://localhost:8080')
    const [messageHistory, setMessageHistory] = useState([])
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);

    const CHAT_HISTORY = 'chatHistory'
    const CHAT_MESSAGE = 'chatMessage'

    const requestMessageHistory = (ownId, partnerId) => {
        sendJsonMessage({
            initiatorId: ownId,
            partnerId: partnerId,
            type: 'chatHistory'
        })
    }

    useEffect(() => {
        const partnerData = getPartnerData(lastJsonMessage.senderId)
        const isUnknownSender = partnerData == null
        const isSenderChatPartner = chatPartner.userId === lastJsonMessage.senderId
        const isAppMinimized = true;

        const processIncomingHistory = () => {
            if (isUnknownSender) {
                createNewPartner(lastJsonMessage)
                return
            }

            setPartnerLastMessage(lastJsonMessage.history.length - 1, partnerData)
            setMessageHistory(lastJsonMessage)
        }

        const processIncomingMessage = () => {
            if (isUnknownSender) {
                createNewPartner(lastJsonMessage)
                return
            }

            setPartnerLastMessage(lastJsonMessage, partnerData)

            if (isSenderChatPartner) {
                // client currently has an open chat window with the sender
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
            senderId: 'ownId',
            date: '1 January 1st 14:05:36',
            text: text,
            delivered: true,
            type: 'chatMessage'
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