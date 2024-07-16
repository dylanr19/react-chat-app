import {createContext, useEffect, useState} from 'react';
import {playNotificationSound, showDesktopNotification} from "./notificationUtils.js";
import {appendMessageToChat, sendMessage, setMessageFailed} from "./messageUtils.js";
import {createNewPartner, getPartnerData, setPartnerLastMessage} from "./partnerUtils.js";
import useWebSocket, { ReadyState } from "react-use-websocket";

const initialPartnerData = {photoURL : '', name: '', userId: '', lastMessage: '', isActive: false}
const initialMessageData = {photoURL: '', senderId: '', date: '', text: '', delivered: true}
const placeholderPartner = {photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', name: 'Jacob', userId: 'user1', lastMessage: 'I am not sure if we can work that out.', isActive: false}
const placeholderMessage = {photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', senderId: 'user1', date: '11:02 AM, January, 23rd', text: 'I am not sure if that can work out.', delivered: true}

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatPartner, setChatPartner] = useState(initialPartnerData)
    const [partnerList, setPartnerList] = useState([placeholderPartner])

    const [socketUrl, setSocketUrl] = useState('wss://localhost:8080')
    const [messageHistory, setMessageHistory] = useState([initialMessageData])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);
    // const [newMessage, setNewMessage] = useState(initialMessageData)

    useEffect(() => {
        // Request message history of this user & selected chat partner
        //setMessageHistory(requestMessageHistory('xxx', 'xxx'))
        requestMessageHistory('xxx', 'xxx')
    }, [chatPartner])

    useEffect(() => {
        processIncomingMessage()
    }, [lastJsonMessage])

    useEffect(() => {
        logConnectionStatus()
    }, [readyState]);

    const logConnectionStatus = () => {
        if (readyState === ReadyState.OPEN) {
            console.log('connected to server')
        }

        else if (readyState === ReadyState.CLOSED) {
            console.log('connection to server is closed')
        }

        else if (readyState === ReadyState.UNINSTANTIATED){
            console.log('websocket has not been instantiated')
        }
    }

    const requestMessageHistory = (ownId, partnerId) => {
        sendJsonMessage({
            initiatorId: ownId,
            partnerId: partnerId,
            isHistory: true
        })
    }

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
            delivered: true
        }

        appendMessageToChat(messageData, messageHistory, setMessageHistory)

        if (sendJsonMessage(messageData) === false) {
            // show user that message was not delivered
            setMessageFailed('xxx')
        }
    }

    const processIncomingMessage = () => {
        const isHistory = lastJsonMessage.isHistory === true;
        const partnerListCopy = [...partnerList]
        const partnerData = getPartnerData(lastJsonMessage.senderId, partnerListCopy)
        const isSenderNew = partnerData == null
        const isSenderChatPartner = chatPartner.userId === lastJsonMessage.senderId
        const isAppMinimized = true;

        if (isHistory) {
            setMessageHistory(lastJsonMessage.messageHistory)
        }

        if (isSenderNew) {
            createNewPartner(lastJsonMessage, partnerListCopy, setPartnerList)
        } else {
            setPartnerLastMessage(lastJsonMessage, partnerData, partnerListCopy, setPartnerList)

            if (isSenderChatPartner) {
                // client currently has an open chat window with the sender
                appendMessageToChat(lastJsonMessage, messageHistory, setMessageHistory)
            }
        }

        if (isAppMinimized) {
            playNotificationSound()
            showDesktopNotification()
        }
    }

    return (
        <ChatContext.Provider value={{
            processOutgoingMessage,
            readyState,
            messageHistory,
            setMessageHistory,
            chatPartner,
            setChatPartner,
            partnerList,
            setPartnerList
        }}>
            {children}
        </ChatContext.Provider>
    );
};
