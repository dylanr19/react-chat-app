import React, {useEffect} from "react";

function FriendItem ({ userData, showChatButton, showAcceptButton, showDeleteButton, onDelete, onChat, onAccept }) {
    const {
        name,
        userId,
        photoURL,
    } = userData

    const onDeleteClick = () => {
        onDelete(userId)
    }

    const onChatClick = () => {
        onChat(userData)
    }

    const onAcceptClick = () => {
        onAccept(userId)
    }

    return(
        <>
            <div className="friend-item">
                <div className="info">
                    <img className="photo"
                         src={photoURL === 'none' ? 'src/assets/profile picture placeholder.jpg' : photoURL}
                         alt="Photo of this user"
                    />
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