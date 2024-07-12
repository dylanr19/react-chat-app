import { useContext } from 'react'
import {MessageContext} from "./MessageContext.jsx";
import './App.css'

function Recipientbar() {
    const { chatPartner } = useContext(MessageContext)

    return (
        <>
            <div className="recipient-bar">
                To: {chatPartner.name === '' ? 'name unavailable' : chatPartner.name}
            </div>
        </>
    )
}

export default Recipientbar
