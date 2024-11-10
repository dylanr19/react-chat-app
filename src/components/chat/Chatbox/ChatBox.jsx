import '../../../styles/App.css'
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../Contexts/LoginContext.jsx";
import {formatDate} from "/src/components/chat/Chatbox/formatDate.js"
import {SentMessage} from "./SentMessage.jsx";
import {ReceivedMessage} from "./ReceivedMessage.jsx";
import placeholder from "/src/assets/profile picture placeholder.jpg"

function ChatBox({ photoURL, text, date, senderId }) {
    const { userId: loggedInUserid } = useContext(LoginContext)
    const [ localisedDate, setLocalisedDate ] = useState("")

    const isOwnMessage = (senderId) => {
        return senderId === loggedInUserid
    }

    useEffect(() => {
        formatDate(date, setLocalisedDate)
    }, []);

    return (
        <>
        {
            isOwnMessage(senderId) ?
                <SentMessage text={text} date={localisedDate} />
                :
                <ReceivedMessage
                    photoURL={photoURL === 'none' || photoURL != null ? photoURL : placeholder}
                    date={localisedDate}
                    text={text}
                />
        }
        </>
    )
}

export default ChatBox
