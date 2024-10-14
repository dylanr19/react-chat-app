import '../../../styles/App.css'
import {useContext, useEffect, useState} from 'react'
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

    useEffect(() => {
        if (partnerData.unreadMessageCount === 1){
            // play sound on 1st unread message to prevent annoying spam
            const notification = new Audio('src/assets/out-of-nowhere-message-tone.mp3')
            notification.volume = 0.7
            notification.play()
        }
    }, [partnerData.unreadMessageCount]);

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
                    src={partnerData.photoURL === 'none' || partnerData.photoURL == null ? 'src/assets/profile picture placeholder.jpg' : partnerData.photoURL}
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
