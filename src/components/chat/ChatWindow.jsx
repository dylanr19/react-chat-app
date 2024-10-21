import '../../styles/App.css'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import debounce from 'lodash.debounce';
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import {ChatMessageContext} from "../../Contexts/ChatMessageContext.jsx";
import ChatBox from "./Chatbox/ChatBox.jsx";


function ChatWindow() {
    const chatWindowRef = useRef(null)
    const messageSequence = useRef({skip:  0, take: 15,})
    const newMessageCount = useRef(0) // prevents fetching messages that have already been fetched
    const prevScrollheight = useRef(null)

    const [previousMessageHistory, setPreviousMessageHistory] = useState([])
    const { openChatTab } = useContext(ChatContext)
    const { messageHistory, requestMessageHistory } = useContext(ChatMessageContext)

    const handleScroll = () => {
        const chatWindow = chatWindowRef.current

        if (Math.ceil(Math.abs(chatWindow.scrollTop)) >= (chatWindow.scrollHeight - chatWindow.clientHeight) - 5){
            // Scroll bar has reached top of container ( direction reversed with css ). The compirason is not pixel perfect, hence the 5px offset
            // This is true when scrollTop equals value of max scrollable height -
            // ( so full container height minus the portion of the container that's within viewport )
            messageSequence.current = {skip: messageSequence.current.skip + 15 + newMessageCount.current, take: 15}
            requestMessageHistory(openChatTab.userId, messageSequence.current.skip, messageSequence.current.take)
            prevScrollheight.current = chatWindow.scrollHeight
        }
    }

    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current === true) {
            firstRender.current = false;
            return
        }

        const chatWindow = chatWindowRef.current

        const scrollToBottom = () => {
            if (chatWindow.scrollTop === 0){
                chatWindow.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }
        }

        const scrollToPreviousPosition = () =>  {
            const currentScrollHeight = chatWindow.scrollHeight
            const addedHeight = currentScrollHeight - prevScrollheight.current
            chatWindow.scrollTop = -chatWindow.scrollHeight
            chatWindow.scrollTop += addedHeight
        }

        if (previousMessageHistory.length > 0) {
            if (messageHistory[0] !== previousMessageHistory[0]){
                // New message received
                scrollToBottom()
                newMessageCount.current++
            } else {
                // Fetched more chat history messages which increases the height of the container and -
                // positions the scrollbar at the top of the new height
                scrollToPreviousPosition()
                setTimeout(() =>  scrollToPreviousPosition(), 10)
            }
        }

        setPreviousMessageHistory(messageHistory)
    }, [messageHistory]);

    useEffect(() => {
        // When a new chat starts, clear the values from the prev chat session, to prevent unwanted behaviour.
        setPreviousMessageHistory([])
        chatWindowRef.current.scrollTop = 0
        prevScrollheight.current = 0
        newMessageCount.current = 0
        messageSequence.current = { skip: 0, take: 15 }
    }, [openChatTab]);

    const handleScrollEnd = debounce(handleScroll, 100);

    return (
        <>
            <div className="chat-window" ref={chatWindowRef} onScroll={handleScrollEnd}>
                {messageHistory.map((message) => (
                    <ChatBox
                        photoURL={message.photoURL}
                        text={message.text}
                        date={message.date}
                        key={message.id}
                        senderId={message.senderId}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatWindow
