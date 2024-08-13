import { useContext } from 'react'
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import '../../styles/App.css'

function Recipientbar() {
    const { chatPartner } = useContext(ChatContext)

    return (
        <>
            <div className="recipient-bar">
                To: {chatPartner?.name === '' ? 'name unavailable' : chatPartner?.name}
            </div>
        </>
    )
}

export default Recipientbar
