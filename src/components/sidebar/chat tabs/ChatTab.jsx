import '../../../styles/App.css'
import {useContext} from 'react'
import {ChatContext} from "../../../Contexts/ChatContext.jsx";

function ChatTab({ partnerData }) {
    const {
        startNewChat,
        resetUnreadMessages,
        highlightChatTab,
        unhighlightChatTab
    } = useContext(ChatContext)

    const handleTabClick = () => {
        resetUnreadMessages(partnerData.userId)
        unhighlightChatTab()
        highlightChatTab(partnerData.userId)
        startNewChat(partnerData)
    }

    return (
        <>
            <button
                className="partner-tab"
                style={{ background: partnerData.isHighlighted ? '#ededed' : 'white' }}
                id={partnerData.userId}
                onClick={() => handleTabClick()}
            >

                <img
                    className="photo"
                    src={partnerData.photoURL}
                    alt={"photo of " + partnerData.name}
                />

                <div className="info-container">
                    <div className="name">{partnerData.name}</div>
                </div>

                {
                    partnerData.unreadMessageCount === 0
                        ? <div className="placeholder" style={{width: '15px', height: '15px'}}></div>
                        : <div className="unread-icon-container">
                            <i className="bi bi-chat-left-dots-fill"></i>
                            <div className="unread-count">{partnerData.unreadMessageCount}</div>
                        </div>
                }

            </button>
        </>
    )
}

export default ChatTab
