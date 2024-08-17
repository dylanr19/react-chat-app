import '../../styles/App.css'
import {useContext} from "react";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

function ChatBox({ photoURL, text, date, senderId }) {
    const { userId: loggedInUserid } = useContext(LoginContext)

    const isOwnMessage = (senderId) => {
        return senderId === loggedInUserid
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
