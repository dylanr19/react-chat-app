import {createContext, useEffect} from 'react';
import usePartnerManager from "../components/hooks/usePartnerManager.jsx";
import useMessaging from "../components/hooks/useMessaging.jsx";

// const initialPartnerData = {photoURL : '', name: '', userId: '', lastMessage: '', isActive: false}
// const initialMessageData = {photoURL: '', senderId: '', date: '', text: '', delivered: true}
// const placeholderPartner = {photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', name: 'Jacob', userId: 'user1', lastMessage: 'I am not sure if we can work that out.', isActive: false}
// const placeholderMessage = {photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', senderId: 'user1', date: '11:02 AM, January, 23rd', text: 'I am not sure if that can work out.', delivered: true}
//TODO: This context serves no purpose anymore, get rid of it.
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const { partnerObj } = usePartnerManager()
    const { messageObj } = useMessaging(partnerObj)

    const chatPartner = partnerObj.chatPartner
    const setChatPartner = partnerObj.setChatPartner
    const partnerList = partnerObj.partnerList
    const setPartnerList = partnerObj.setPartnerList

    const readyState = messageObj.readyState
    const messageHistory = messageObj.messageHistory
    const requestMessageHistory = messageObj.requestMessageHistory
    const processOutgoingMessage = messageObj.processOutgoingMessage

    useEffect(() => {
        requestMessageHistory('xxx', chatPartner.userId)
    }, [chatPartner])

    const startNewChat = (partnerData) => {
        setChatPartner(partnerData)
    }

    const sendChatMessage = (text) => {
        processOutgoingMessage(text)
    }

    useEffect(() => {

    }, []);

    return (
        <ChatContext.Provider value={{
            readyState,
            messageHistory,
            sendChatMessage,
            startNewChat,
            chatPartner,
            partnerList,
            setPartnerList,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
