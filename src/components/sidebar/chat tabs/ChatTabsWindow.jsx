import '../../../styles/App.css'
import ChatTab from './ChatTab.jsx'
import {useContext} from "react";
import {ChatContext} from '../../../Contexts/ChatContext.jsx'

function ChatTabsWindow() {
    const { filteredChatTabs } = useContext(ChatContext)

    return (
        <>
            <div className="side-bar">
                {
                    filteredChatTabs.map((partner) => (
                    <ChatTab
                        partnerData={partner}
                        key={partner.userId}
                    />))
                }
            </div>
        </>
    )
}

export default ChatTabsWindow
