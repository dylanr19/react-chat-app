import React from 'react';

export const SentMessage = ({ text, date }) => {

    return (
        <div className={"chat-box-sent"}>
            <div className="message-container">
                <span className="text">{text}</span>
                <span className="date">{date}</span>
            </div>
        </div>
    )
}