import '../../../styles/App.css'
import React, {useContext, useEffect, useState} from 'react'
import {ChatContext} from "../../../Contexts/ChatContext.jsx";
import {FriendContext} from "../../../Contexts/FriendContext.jsx";
import {STATUS} from "./STATUS.js";
import {playMessageAudio } from "/src/components/other/SoundFX.js"
import {Userphoto} from "../../other/UserPhoto.jsx";
import {useLiveUsername} from "../../other/useLiveUsername.jsx";

function ChatTab({ partner }) {
    const { startNewChat } = useContext(ChatContext)
    const { username } = useLiveUsername(partner.name, partner.userId)

    useEffect(() => {
        if (partner.unreadMessageCount === 1)
            playMessageAudio()
    }, [partner.unreadMessageCount]);

    const handleTabClick = () => {
        startNewChat(partner)
    }

    return (
        <>
            <button
                className="partner-tab"
                style={{background: partner.isHighlighted ? '#161b26' : '#0c111d'}}
                id={partner.userId}
                onClick={() => handleTabClick()}
            >

                <Userphoto
                    userId={partner.userId}
                    photoURL={partner.photoURL}
                />

                <div className="info-container">
                    <div className="name">{username}</div>
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
