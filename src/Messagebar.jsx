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
                <input type="text" className="text-input" placeholder="Type a message here ..." />
                <button type="button" className="send-button">
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>
        </>
    )
}

export default Messagebar
