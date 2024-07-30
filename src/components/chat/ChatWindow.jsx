import '../../styles/App.css'
import {useContext} from 'react'
import ChatBox from './ChatBox.jsx'
import {ChatContext} from "../../chat context/ChatContext.jsx";
import {v4 as uuidv4} from 'uuid'


function ChatWindow() {
    const { messageHistory } = useContext(ChatContext)

    return (
        <>
            <div className="chat-window">
                {messageHistory.map((message) => (
                    <ChatBox
                        //photoURL={message.photoURL}
                        photoURL={'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg'}
                        text={message.text}
                        date={message.date}
                        //key={message.senderId}
                        key={uuidv4()}
                        senderId={message.senderId}
                    />
                ))}
            </div>
        </>
    )
}

export default ChatWindow
