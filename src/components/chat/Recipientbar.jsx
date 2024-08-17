import { useContext } from 'react'
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import '../../styles/App.css'

function Recipientbar() {
    const { currentChatPartner } = useContext(ChatContext)

    return (
        <>
            <div className="recipient-bar">
                To: {currentChatPartner?.name === '' ? 'name unavailable' : currentChatPartner?.name}
            </div>
        </>
    )
}

export default Recipientbar
