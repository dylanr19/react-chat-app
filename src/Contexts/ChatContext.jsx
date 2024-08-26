import {createContext, useContext, useEffect, useState} from 'react';
import useMessaging from "../components/hooks/useMessaging.jsx";
import {LoginContext} from "./LoginContext.jsx";

// const initialPartnerData = {photoURL : '', name: '', userId: '', lastMessage: '', isActive: false}
// const initialMessageData = {photoURL: '', senderId: '', date: '', text: '', delivered: true}
// const placeholderPartner = {photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', name: 'Jacob', userId: 'user1', lastMessage: 'I am not sure if we can work that out.', isActive: false}
// const placeholderMessage = {photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', senderId: 'user1', date: '11:02 AM, January, 23rd', text: 'I am not sure if that can work out.', delivered: true}
//TODO: This context serves no purpose anymore, get rid of it.
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    // const [currentChatPartner, setCurrentChatPartner] = useState({
    //     photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
    //     name: 'Bob',
    //     userId: 'user2',
    //     lastMessage: 'lmao',
    //     isActive: false
    // })
    const [currentChatPartner, setCurrentChatPartner] = useState(null)

    const [chatPartners, setChatPartners] = useState([])

    const checkPartnerExists = (userId) => {
        return chatPartners.some((cp) => cp.userId === userId)
    }

    const createNewChatPartner = (user) => {
        const newPartner = {
            //photoURL: user.photoURL,
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            //name: user.name,
            name: 'test',
            userId: user.senderId,
            lastMessage: user.text,
            isActive: false
        }

        setChatPartners((prev) => prev.concat(newPartner))
    }

    const getChatPartnerData = (Id, list = chatPartners) => {
        return list.find(partner => partner.userId === Id)
    }

    const setChatPartnerLastMessage = (userId, message) => {
        //const partnerListCopy = [...chatPartners]
        //const partner = getChatPartnerData(userId)
        //partner.lastMessage = message
        //setChatPartners(partnerListCopy)
    }

    const startNewChat = (partnerData) => {
        setCurrentChatPartner(partnerData)
        requestMessageHistory(partnerData.userId)
    }

    const {
        readyState,
        messageHistory,
        requestMessageHistory,
        processOutgoingMessage
    } = useMessaging(currentChatPartner, setChatPartnerLastMessage, checkPartnerExists, createNewChatPartner)

    return (
        <ChatContext.Provider value={{
            readyState,
            messageHistory,
            processOutgoingMessage,
            startNewChat,
            currentChatPartner,
            chatPartners,
            setChatPartners,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
