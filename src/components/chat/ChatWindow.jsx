import '../../styles/App.css'
import {useContext, useEffect} from 'react'
import ChatBox from './ChatBox.jsx'
import {ChatContext} from "../../Contexts/ChatContext.jsx";


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
                        key={message.date}
                        senderId={message.senderId}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatWindow
