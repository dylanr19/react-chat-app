import {createContext, useState} from 'react';
import useMessaging from "../components/hooks/useMessaging.jsx";

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

    const checkChatTabAlreadyOpen = (userId) => {
        if (openChatTab != null){
            return openChatTab.userId === userId
        }
    }

    const createNewChatTab = (userId, name, photoURL, isHighlighted, unreadMessageCount) => {
        const newPartner = {
            photoURL: photoURL,
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
        if (partner != null) {
            partner.unreadMessageCount++
            setChatTabs(copy)
        }
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
        if (checkChatTabAlreadyOpen(partner.userId)){
            return
        }

        if (checkChatTabExists(partner.userId) === false) {
            createNewChatTab(
                partner.userId,
                partner.name,
                partner.photoURL,
                true,
                0
            )
        }

        unhighlightChatTab()
        highlightChatTab(partner.userId)
        setOpenChatTab(partner)
        resetUnreadMessages(partner.userId)
        clearMessageHistory()
        requestMessageHistory(partner.userId, 0, 15)
    }

    const {
        readyState,
        messageHistory,
        setMessageHistory,
        lastMessage,
        setLastMessage,
        requestMessageHistory,
        clearMessageHistory,
        processOutgoingMessage
    } = useMessaging(openChatTab, checkChatTabExists, createNewChatTab, incrementUnreadMessages)

    return (
        <ChatContext.Provider value={{
            readyState,
            messageHistory,
            setMessageHistory,
            lastMessage,
            setLastMessage,
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
            resetUnreadMessages,
            requestMessageHistory
        }}>
            {children}
        </ChatContext.Provider>
    );
};
