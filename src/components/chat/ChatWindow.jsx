import '../../styles/App.css'
import {useCallback, useContext, useEffect, useLayoutEffect, useReducer, useRef, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import {ChatList} from "./ChatList.jsx";
import {ChatMessageContext} from "../../Contexts/ChatMessageContext.jsx";


function ChatWindow() {
    const chatWindowRef = useRef(null)
    const messageSequence = useRef({skip:  0, take: 15,})
    const newMessageCount = useRef(0)
    const prevScrollheight = useRef(null)

    const [forceMount, setForceMount] = useState(false)
    const [previousMessageHistory, setPreviousMessageHistory] = useState([])
    const { openChatTab } = useContext(ChatContext)
    const { messageHistory, requestMessageHistory } = useContext(ChatMessageContext)

    const handleScroll = () => {
        const chatWindow = chatWindowRef.current

        if (Math.ceil(Math.abs(chatWindow.scrollTop)) >= (chatWindow.scrollHeight - chatWindow.clientHeight) - 5){
            messageSequence.current = {skip: messageSequence.current.skip + 15 + newMessageCount.current, take: 15}
            console.log(messageSequence.current)
            requestMessageHistory(openChatTab.userId, messageSequence.current.skip, messageSequence.current.take)
            prevScrollheight.current = chatWindow.scrollHeight
        }
    }

    const firstRender = useRef(true)
    useLayoutEffect(() => {
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
        setPreviousMessageHistory([])
        prevScrollheight.current = 0
        newMessageCount.current = 0
        messageSequence.current = { skip: 0, take: 15 }

        // setForceMount(true)
        // setTimeout(() => setForceMount( false), 10)
    }, [openChatTab]);

    const debouncedHandleScroll = debounce(handleScroll, 100);

    return (
        <>
            <ChatList
                key={forceMount}
                force={forceMount}
                chatWindowRef={chatWindowRef}
                handleScroll={debouncedHandleScroll}
                messageHistory={messageHistory}
            />
        </>
    )
}

export default ChatWindow
