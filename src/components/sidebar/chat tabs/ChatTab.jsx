import '../../../styles/App.css'
import React, {useContext, useEffect, useState} from 'react'
import {ChatContext} from "../../../Contexts/ChatContext.jsx";
import {FriendContext} from "../../../Contexts/FriendContext.jsx";
import {STATUS} from "./STATUS.js";
import {playMessageAudio } from "/src/components/other/SoundFX.js"
import {Userphoto} from "../../other/UserPhoto.jsx";

function ChatTab({ partner }) {
    const { startNewChat } = useContext(ChatContext)

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
                style={{background: partner.isHighlighted ? '#ededed' : 'white'}}
                id={partner.userId}
                onClick={() => handleTabClick()}
            >

                <Userphoto
                    userId={partner.userId}
                    photoURL={partner.photoURL}
                    style={{ minWidth: '15.7px'}}
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
