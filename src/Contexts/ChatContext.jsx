import {createContext, useState} from 'react';
import useMessaging from "../components/hooks/useMessaging.jsx";

// const initialPartnerData = {photoURL : '', name: '', userId: '', lastMessage: '', isActive: false}
// const initialMessageData = {photoURL: '', senderId: '', date: '', text: '', delivered: true}
// const placeholderPartner = {photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', name: 'Jacob', userId: 'user1', lastMessage: 'I am not sure if we can work that out.', isActive: false}
// const placeholderMessage = {photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg', senderId: 'user1', date: '11:02 AM, January, 23rd', text: 'I am not sure if that can work out.', delivered: true}
//TODO: This context serves no purpose anymore, get rid of it.
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [openChatTab, setOpenChatTab] = useState(null)
    const [chatTabs, setChatTabs] = useState([])
    const [filteredChatTabs, setFilteredChatTabs] = useState([])

    const clearChatContext = () => {
        setOpenChatTab(null)
        setChatTabs([])
        setFilteredChatTabs([])
    }

    const checkChatTabExists = (userId) => {
        return chatTabs.some((cp) => cp.userId === userId)
    }

    const createNewChatTab = (userId, name, photoURL, isHighlighted, unreadMessageCount) => {
        const newPartner = {
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: name,
            userId: userId,
            isHighlighted: isHighlighted,
            unreadMessageCount: unreadMessageCount
        }

        setChatTabs((prev) => prev.concat(newPartner))
    }

    const removeChatTab = (userId) => {
        setChatTabs(
            chatTabs.filter(p => p.userId !== userId)
        )

        setFilteredChatTabs(
            filteredChatTabs.filter(p => p.userId !== userId)
        )

        if (openChatTab?.userId === userId)
            setOpenChatTab(null)
    }

    const highlightChatTab = (userId) => {
        const copy = [...chatTabs]
        const partner = copy.find(p => p.userId === userId)
        if (partner != null){
            partner.isHighlighted = true
            setChatTabs(copy)
        }
    }

    const unhighlightChatTab = () => {
        const copy = [...chatTabs]
        const partner = copy.find(p => p.isHighlighted === true)
        if (partner != null) {
            partner.isHighlighted = false
            setChatTabs(copy)
            setOpenChatTab(null)
        }
    }

    const incrementUnreadMessages = (userId) => {
        const copy = [...chatTabs]
        const partner = copy.find(p => p.userId === userId)
        partner.unreadMessageCount++
        setChatTabs(copy)
    }

    const resetUnreadMessages = (userId) => {
        const copy = [...chatTabs]
        const partner = copy.find(p => p.userId === userId)
        if (partner != null) {
            partner.unreadMessageCount = 0
            setChatTabs(copy)
        }
    }

    const startNewChat = (partner) => {
        if (checkChatTabExists(partner.userId) === false) {
            createNewChatTab(
                partner.userId,
                partner.name,
                '',
                true,
                0
            )
        }

        unhighlightChatTab()
        highlightChatTab(partner.userId)
        setOpenChatTab(partner)
        resetUnreadMessages(partner.userId)
        requestMessageHistory(partner.userId)
    }

    const {
        readyState,
        messageHistory,
        requestMessageHistory,
        processOutgoingMessage
    } = useMessaging(openChatTab, checkChatTabExists, createNewChatTab, incrementUnreadMessages)

    return (
        <ChatContext.Provider value={{
            readyState,
            messageHistory,
            clearChatContext,
            removeChatTab,
            processOutgoingMessage,
            startNewChat,
            highlightChatTab,
            unhighlightChatTab,
            openChatTab,
            chatTabs,
            setChatTabs,
            filteredChatTabs,
            setFilteredChatTabs,
            resetUnreadMessages
        }}>
            {children}
        </ChatContext.Provider>
    );
};
