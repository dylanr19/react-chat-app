import '../../../styles/App.css'
import {useContext, useEffect, useState} from 'react'
import {ChatContext} from "../../../Contexts/ChatContext.jsx";

function ChatTab({ partner }) {
    const {
        startNewChat,
        openChatTab,
        resetUnreadMessages,
        highlightChatTab,
        unhighlightChatTab
    } = useContext(ChatContext)

    const handleTabClick = () => {
        // resetUnreadMessages(partnerData.userId)
        // unhighlightChatTab()
        // highlightChatTab(partnerData.userId)
        startNewChat(partner)

    }

    useEffect(() => {
        if (partner.unreadMessageCount === 1){
            const notification = new Audio('src/assets/out-of-nowhere-message-tone.mp3')
            notification.volume = 0.7
            notification.play()
        }
    }, [partner.unreadMessageCount]);

    return (
        <>
            <button
                className="partner-tab"
                style={{ background: partner.isHighlighted ? '#ededed' : 'white' }}
                id={partner.userId}
                onClick={() => handleTabClick()}
            >

                <img
                    className="photo"
                    src={partner.photoURL === 'none' || partner.photoURL == null ? 'src/assets/profile picture placeholder.jpg' : partner.photoURL}
                    alt={"photo of " + partner.name}
                />

                <div className="info-container">
                    <div className="name">{partner.name}</div>
                </div>

                {
                    partner.unreadMessageCount === 0
                        ? <div className="placeholder" style={{width: '15px', height: '15px'}}></div>
                        : <div className="unread-icon-container">
                            <i className="bi bi-chat-left-dots-fill"></i>
                            <div className="unread-count">{partner.unreadMessageCount}</div>
                        </div>
                }

            </button>
        </>
    )
}

export default ChatTab
