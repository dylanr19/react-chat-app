import '../../../styles/App.css'
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../Contexts/LoginContext.jsx";
import {formatDate} from "/src/components/chat/Chatbox/formatDate.js"
import {SentMessage} from "./SentMessage.jsx";
import {ReceivedMessage} from "./ReceivedMessage.jsx";

function ChatBox({ photoURL, text, date, senderId }) {
    const { userId: loggedInUserid } = useContext(LoginContext)
    const [ localisedDate, setLocalisedDate ] = useState("")

    const isOwnMessage = (senderId) => {
        return senderId === loggedInUserid
    }

    // This useEffect gets called once upon the creation of the chat box
    // a chat box gets created whenever the chat window gets a new chat message
    useEffect(() => {
        formatDate(date, setLocalisedDate)
    }, []);

    return (
        <>
        {
            isOwnMessage(senderId) ?
                <SentMessage text={text} date={localisedDate} />
                :
                <ReceivedMessage photoURL={photoURL} date={localisedDate} text={text} />
        }
        </>
    )
}

export default ChatBox
