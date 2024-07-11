import './App.css'

function ChatBox({ photoURL, text, date }) {


    return (
        <>
            <div className="chat-box-received">
                <div className="photo-container">
                    <img className="photo"
                         src={photoURL}/>
                </div>
                <div className="message-container">
                    <span className="text">{text}</span>
                    <span className="date">{date}</span>
                </div>
            </div>
        </>
    )
}

export default ChatBox
