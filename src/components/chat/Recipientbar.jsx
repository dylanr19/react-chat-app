import {useContext, useEffect} from 'react'
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import '../../styles/App.css'

function Recipientbar() {
    const { openChatTab } = useContext(ChatContext)

    return (
        <>
            <div className="recipient-bar">
                To: {openChatTab?.name === '' ? 'name unavailable' : openChatTab?.name}
            </div>
        </>
    )
}

export default Recipientbar
