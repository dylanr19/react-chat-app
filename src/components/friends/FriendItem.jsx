import React from "react";

function FriendItem ({ name, photoURL, userId, isPending, setOriginalList, setFriendList, removeFriend, }) {

    const onDeleteClick = () => {
        setOriginalList((prev) => prev.filter(f => f.userId !== userId));
        setFriendList((prev) => prev.filter(f => f.userId !== userId));
        removeFriend(userId)
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
                {
                    isPending ? null : (
                        <>
                            <div className="buttons">
                                <button className="chat-button">
                                    <i className="bi bi-chat-fill"></i>
                                </button>
                                <button className="delete-button" onClick={onDeleteClick}>
                                    <i className="bi bi-x"></i>
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default FriendItem