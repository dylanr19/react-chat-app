import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {ChatMessageContext} from "./ChatMessageContext.jsx";
import {MESSAGE_TYPES} from "./MESSAGE_TYPES.js";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [openChatTab, setOpenChatTab] = useState(null)
    const [chatTabs, setChatTabs] = useState([])
    const [filteredChatTabs, setFilteredChatTabs] = useState([])
    const newPartner = useRef(null)

    const {
        lastSentChatMessage,
        lastJsonMessage,
        requestMessageHistory,
        clearMessageHistory,
        messageHistory,
        setMessageHistory
    } = useContext(ChatMessageContext)

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
        resetUnreadMessages(partner.userId)

        newPartner.current = partner
        setOpenChatTab(partner)
    }

    useEffect(() => {
        if (openChatTab != null){
            // State change of openchattab has to be finished before setting the messageHistory states,
            // to prevent bug in ChatWindow component
            clearMessageHistory()
            requestMessageHistory(newPartner.current.userId, 0, 15)
        }
    }, [openChatTab]);

    useEffect(() => {
        const handleChatMessage = () => {
            if (lastJsonMessage == null || lastJsonMessage.type !== MESSAGE_TYPES.CHAT_MESSAGE){
                return
            }

            const { name, senderId, photoURL } = lastJsonMessage.chatMessage
            if (checkChatTabExists(senderId) === false){
                createNewChatTab(senderId, name, photoURL, false, 1)
                incrementUnreadMessages(senderId)
                return
            }

            if (openChatTab != null && openChatTab.userId === senderId){
                // The sender's ID is equal to the ID of the user that is in ur current chat session.
                const notification = new Audio('src/assets/mixkit-message-pop-alert-2354.mp3')
                notification.volume = 0.5
                notification.play()

                // Chat Messages in the lowest indexes of the array, render at the bottom of the chat.
                // Bottom newest messages -> top oldest.
                setMessageHistory([lastJsonMessage.chatMessage].concat(messageHistory))
            } else {
                incrementUnreadMessages(senderId)
            }
        }

        handleChatMessage()
    }, [lastJsonMessage]);

    useEffect(() => {
        if (lastSentChatMessage != null)
            setMessageHistory([lastSentChatMessage].concat(messageHistory))
    }, [lastSentChatMessage]);

    return (
        <ChatContext.Provider value={{
            clearChatContext,
            removeChatTab,
            startNewChat,
            highlightChatTab,
            unhighlightChatTab,
            openChatTab,
            setOpenChatTab,
            chatTabs,
            setChatTabs,
            filteredChatTabs,
            setFilteredChatTabs,
            resetUnreadMessages,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
