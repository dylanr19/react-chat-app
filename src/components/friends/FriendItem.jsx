import React, {useContext, useEffect, useState} from "react";
import {Userphoto} from "../other/UserPhoto.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import {useLiveUsername} from "../other/useLiveUsername.jsx";

function FriendItem ({ userData, showChatButton, showAcceptButton, showDeleteButton, onDelete, onChat, onAccept }) {
    const {name, userId, photoURL,} = userData

    const { username } = useLiveUsername(name, userId)

    const onDeleteClick = () => onDelete(userId)
    const onChatClick = () => onChat(userData)
    const onAcceptClick = () => onAccept(userId)

    return(
        <>
            <div className="friend-item">

                <div className="info">
                    <Userphoto userId={userId} photoURL={photoURL} />

                    <div className="credentials">
                        <h2 className="name">{username}</h2>
                        <p className="userID">{userId}</p>
                    </div>
                </div>

                <div className="buttons">
                    { showChatButton &&
                        <button className="chat-button" onClick={onChatClick}>
                            <i className="bi bi-chat-fill" />
                        </button>
                    }

                    { showAcceptButton &&
                        <button className="accept-button" onClick={onAcceptClick}>
                            <i className="bi bi-check-lg" />
                        </button>
                    }

                    { showDeleteButton &&
                        <button className="delete-button" onClick={onDeleteClick}>
                            <i className="bi bi-x" />
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendItem