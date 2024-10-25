import '../../styles/App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useContext, useEffect, useState} from 'react'
import { ReadyState } from "react-use-websocket";
import {ChatMessageContext} from "../../Contexts/ChatMessageContext.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import {playPopAudio} from "../other/SoundFX.js";

function Messagebar() {
    const { readyState, sendChatMessage  } = useContext(ChatMessageContext)
    const { openChatTab } = useContext(ChatContext)
    const [inputValue, setInputValue] = useState('')

    const submitMessage = () => {
        sendChatMessage(inputValue, openChatTab.userId)
        setInputValue('')
        playPopAudio()
    }

    const handleChange = (e) => setInputValue(e.currentTarget.value)
    const handleClick = () => submitMessage()
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitMessage()
        }
    }

    return (
        <>
            <div className="message-bar">
                <input
                    type="text"
                    className="text-input"
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" className="send-button" onClick={handleClick} disabled={readyState !== ReadyState.OPEN}>
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>
        </>
    )
}

export default Messagebar
