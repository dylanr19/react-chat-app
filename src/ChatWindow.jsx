import './App.css'
import {useContext} from 'react'
import ChatBox from './ChatBox'
import {MessageContext} from "./MessageContext.jsx";


function ChatWindow() {
    const { messageList } = useContext(MessageContext)

    return (
        <>
            <div className="chat-window">
                {messageList.map((message) => (
                    <ChatBox
                        photoURL={message.photoURL}
                        text={message.text}
                        date={message.date}
                        key={message.senderId}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatWindow
