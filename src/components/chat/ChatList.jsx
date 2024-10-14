import React from 'react';
import ChatBox from "./ChatBox.jsx";

export const ChatList = ({ chatWindowRef, handleScroll, messageHistory, force }) => {

    return(
        <>
            {force === true ? <div className="chat-window"></div> :
                <div className="chat-window" ref={chatWindowRef} onScroll={handleScroll}>
                    {messageHistory.map((message) => (
                        <ChatBox
                            photoURL={message.photoURL}
                            text={message.text}
                            date={message.date}
                            key={message.id}
                            senderId={message.senderId}
                        />
                    ))}
                </div>

            }
        </>
    )
}