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
    const [currentChatPartner, setCurrentChatPartner] = useState(null)
    const [previousChatPartner, setPreviousChatPartner] = useState(null)
    const [chatPartners, setChatPartners] = useState([])
    const [filteredChatPartners, setFilteredChatPartners] = useState([])

    const clearChatContext = () => {
        setCurrentChatPartner(null)
        setPreviousChatPartner(null)
        setChatPartners([])
        setFilteredChatPartners([])
    }

    const checkPartnerExists = (userId) => {
        return chatPartners.some((cp) => cp.userId === userId)
    }

    const createNewChatPartner = (userId, name, photoURL) => {
        const newPartner = {
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: name,
            userId: userId,
            isActive: false,
            unreadMessageCount: 0
        }

        setChatPartners((prev) => prev.concat(newPartner))
    }

    const removeChatPartner = (userId) => {
        setChatPartners(
            chatPartners.filter(p => p.userId !== userId)
        )

        setFilteredChatPartners(
            filteredChatPartners.filter(p => p.userId !== userId)
        )

        if (currentChatPartner?.userId === userId)
            setCurrentChatPartner(null)

        if (previousChatPartner?.userId === userId)
            setPreviousChatPartner(null)
    }

    const setPartnerActive = (userId, isActive) => {
        const copy = [...chatPartners]
        const partner = copy.find(p => p.userId === userId)
        partner.isActive = isActive
        setChatPartners(copy)
    }

    const setPartnerInactive = () => {
        const copy = [...chatPartners]
        const partner = copy.find(p => p.isActive === true)
        if (partner != null) {
            partner.isActive = false
            setChatPartners(copy)
            setCurrentChatPartner(null)
        }
    }

    const incrementPartnerUnreadMessageCount = (userId) => {
        const copy = [...chatPartners]
        const partner = copy.find(p => p.userId === userId)
        partner.unreadMessageCount++
        setChatPartners(copy)
    }

    const resetUnreadMessageCount = (userId) => {
        const copy = [...chatPartners]
        const partner = copy.find(p => p.userId === userId)
        if (partner != null) {
            partner.unreadMessageCount = 0
            setChatPartners(copy)
        }
    }

    const startNewChat = (partner) => {
        if (checkPartnerExists(partner.userId) === false) {
            createNewChatPartner(partner.userId, partner.name, '', '')
        }

        setPreviousChatPartner(currentChatPartner)
        setCurrentChatPartner(partner)
        resetUnreadMessageCount(partner.userId)
        requestMessageHistory(partner.userId)
    }

    useEffect(() => {
        if (previousChatPartner != null)
            setPartnerActive(previousChatPartner.userId, false)

        if (currentChatPartner != null)
            setPartnerActive(currentChatPartner.userId, true)
    }, [currentChatPartner]);

    const {
        readyState,
        messageHistory,
        requestMessageHistory,
        processOutgoingMessage
    } = useMessaging(currentChatPartner, checkPartnerExists, createNewChatPartner, incrementPartnerUnreadMessageCount)

    return (
        <ChatContext.Provider value={{
            readyState,
            messageHistory,
            clearChatContext,
            removeChatPartner,
            processOutgoingMessage,
            startNewChat,
            setPartnerActive,
            setPartnerInactive,
            currentChatPartner,
            chatPartners,
            setChatPartners,
            filteredChatPartners,
            setFilteredChatPartners,
            resetUnreadMessageCount
        }}>
            {children}
        </ChatContext.Provider>
    );
};
