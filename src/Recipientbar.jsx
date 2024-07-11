import { useContext } from 'react'
import {MessageContext} from "./MessageContext.jsx";
import './App.css'

function Recipientbar() {
    const {partnerName} = useContext(MessageContext)

    return (
        <>
            <div className="recipient-bar">
                To: {partnerName === null ? 'name unavailable' : partnerName}
            </div>
        </>
    )
}

export default Recipientbar
