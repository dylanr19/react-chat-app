//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function Messagebar() {
    //const [count, setCount] = useState(0)

    return (
        <>
            <div className="message-bar">
                <div className="text-input">Type a message here...</div>
                <div className="send-button">
                    <i className="bi bi-send-fill"></i>
                </div>
            </div>
        </>
    )
}

export default Messagebar
