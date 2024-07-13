import './App.css'
import {useContext} from 'react'
import ChatBox from './ChatBox'
import {ChatContext} from "./ChatContext.jsx";


function ChatWindow() {
    const { messageHistory } = useContext(ChatContext)

    return (
        <>
            <div className="chat-window">
                {messageHistory.map((message) => (
                    <ChatBox
                        photoURL={message.photoURL}
                        text={message.text}
                        date={message.date}
                        key={message.senderId}
                        senderId={message.senderId}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatWindow
