import React from 'react';

export const ReceivedMessage = ({ photoURL, text, date }) => {

    return (
        <>
            <div className={"chat-box-received"}>
                <div className="photo-container">
                    <img className="photo"
                         src={photoURL === 'none' || photoURL == null ? 'src/assets/profile picture placeholder.jpg' : photoURL}/>
                </div>
                <div className="message-container">
                    <span className="text">{text}</span>
                    <span className="date">{date}</span>
                </div>
            </div>
        </>
    )
}