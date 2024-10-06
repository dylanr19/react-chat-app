import '../../styles/App.css'
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

function ChatBox({ photoURL, text, date, senderId }) {
    const { userId: loggedInUserid } = useContext(LoginContext)
    const [ localisedDate, setLocalisedDate ] = useState("")

    const isOwnMessage = (senderId) => {
        return senderId === loggedInUserid
    }

    // This useEffect gets called once upon the creation of the chat box
    // a chat box gets created whenever the chat window gets a new chat message
    useEffect(() => {
        if (date == null){
            // Chat Message just got sent by local user and doesn't include a date
            setLocalisedDate(new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }))

        }  else {
            // Chat Message was fetched from server and includes UTC date of when it was sent
            const messageSentDate = new Date(date)
            const today = new Date()

            if (today.getDay() === messageSentDate.getDay() &&
            today.getMonth() === messageSentDate.getMonth() &&
            today.getFullYear() === messageSentDate.getFullYear()) {
                // Chat Message was sent today, only display the time
                setLocalisedDate(messageSentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }))
            } else {
                // Chat Message was sent on another date
                setLocalisedDate(messageSentDate.toLocaleString([], {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }))
            }
        }
    }, []);

    return (
        <>
        {
            isOwnMessage(senderId)
                ?
                <div className={"chat-box-sent"}>
                    <div className="message-container">
                        <span className="text">{text}</span>
                        <span className="date">{localisedDate}</span>
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
                        <span className="date">{localisedDate}</span>
                    </div>
                </div>
        }
        </>
    )
}

export default ChatBox
