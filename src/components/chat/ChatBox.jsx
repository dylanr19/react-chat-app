import '../../styles/App.css'
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

function ChatBox({ photoURL, text, date, senderId }) {
    const { userId: loggedInUserid } = useContext(LoginContext)
    const [ formattedDate, setFormattedDate ] = useState("")

    const isOwnMessage = (senderId) => {
        return senderId === loggedInUserid
    }

    const formatMessageDate = (utcDateString) => {
        const date = new Date(utcDateString);

        return date.toLocaleString(navigator.language, {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    useEffect(() => {
        setFormattedDate(formatMessageDate(date))
    }, []);

    return (
        <>
        {
            isOwnMessage(senderId)
                ?
                <div className={"chat-box-sent"}>
                    <div className="message-container">
                        <span className="text">{text}</span>
                        <span className="date">{formattedDate}</span>
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
                        <span className="date">{formattedDate}</span>
                    </div>
                </div>
        }
        </>
    )
}

export default ChatBox
