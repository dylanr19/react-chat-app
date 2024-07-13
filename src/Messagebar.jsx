import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useContext, useEffect, useState} from 'react'
import { MessageContext } from './MessageContext.jsx'

function Messagebar() {
    const { processOutgoingMessage } = useContext(MessageContext)
    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.currentTarget.value)
    }

    const handleClick = () => {
        processOutgoingMessage(inputValue)
        setInputValue('')
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
                />
                <button type="button" className="send-button" onClick={handleClick}>
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>
        </>
    )
}

export default Messagebar
