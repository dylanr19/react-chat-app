import {useContext, useEffect} from 'react'
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import '../../styles/App.css'
import {useLiveUsername} from "../other/useLiveUsername.jsx";

function Recipientbar() {
    const { openChatTab } = useContext(ChatContext)
    const { username } = useLiveUsername(openChatTab.name, openChatTab.userId)

    return (
        <>
            <div className="recipient-bar">
                To: {username === '' ? 'name unavailable' : username}
            </div>
        </>
    )
}

export default Recipientbar
