import React from "react";

function FriendItem ({ name, photoURL, userId, showChatButton, showAcceptButton, showDeleteButton, onDelete, onChat, onAccept }) {

    const onDeleteClick = () => {
        onDelete(userId)
    }

    const onChatClick = () => {
        onChat(userId)
    }

    const onAcceptClick = () => {
        onAccept(userId)
    }

    return(
        <>
            <div className="friend-item">
                <div className="info">
                    <img className="photo"
                         src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"
                         alt="Photo of this user"/>
                    <div className="credentials">
                        <h2 className="name">{name}</h2>
                        <p className="userID">{userId}</p>
                    </div>
                </div>
                <div className="buttons">
                    { showChatButton !== true ? null :
                        <button className="chat-button" onClick={onChatClick}>
                            <i className="bi bi-chat-fill"></i>
                        </button>
                    }

                    { showAcceptButton !== true ? null :
                        <button className="accept-button" onClick={onAcceptClick}>
                            <i className="bi bi-check-lg"></i>
                        </button>
                    }

                    { showDeleteButton !== true ? null :
                        <button className="delete-button" onClick={onDeleteClick}>
                            <i className="bi bi-x"></i>
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendItem