import React from "react";

function FriendItem ({ name, photoURL, userId, isPending }) {

    return(
        <>
            <div className="friend-item">
                <h2 className="name">{name}</h2>
                <p className="userID">{userId}</p>
                <img className="photo" src={photoURL}  alt="Photo of this user"/>
                {
                    isPending ? null : (
                        <>
                            <button className="chat-button"></button>
                            <button className="delete-button"></button>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default FriendItem