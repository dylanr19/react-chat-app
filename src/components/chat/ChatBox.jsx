import '../../styles/App.css'

function ChatBox({ photoURL, text, date, senderId }) {

    const isOwnMessage = (senderId) => {
        return senderId === 'user2'
    }

    return (
        <>
        {
            isOwnMessage(senderId)
                ?
                <div className={"chat-box-sent"}>
                    <div className="message-container">
                        <span className="text">{text}</span>
                        <span className="date">{date}</span>
                    </div>
                </div>
                :
                <div className={"chat-box-received"}>
                    <div className="photo-container">
                        <img className="photo"
                             src={photoURL}/>
                    </div>
                    <div className="message-container">
                        <span className="text">{text}</span>
                        <span className="date">{date}</span>
                    </div>
                </div>
        }
        </>
    )
}

export default ChatBox
