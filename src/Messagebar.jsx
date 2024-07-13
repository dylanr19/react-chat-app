import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useContext, useEffect, useState} from 'react'
import { ChatContext } from './ChatContext.jsx'

function Messagebar() {
    const { processOutgoingMessage } = useContext(ChatContext)
    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.currentTarget.value)
    }

    const submitMessage = () => {
        processOutgoingMessage(inputValue)
        setInputValue('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitMessage()
        }
    }

    const handleClick = () => {
        submitMessage()
    }

    return (
        <>
            <div className="message-bar">
                <input
                    type="text"
                    className="text-input"
                    placeholder="Type a message here ..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" className="send-button" onClick={handleClick}>
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>
        </>
    )
}

export default Messagebar
