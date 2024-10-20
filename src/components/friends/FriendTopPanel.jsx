import React from "react";
import {WINDOW_STATES} from "./WINDOW_STATES.js";

function FriendTopPanel({ currentWindow, setCurrentWindow }) {

    const handleClick = (state) => {
        setCurrentWindow(state)
    }

    return(
        <>
            <div className="test123">
            <div className="top-navigation-container">

                <h3 className="title">Friends</h3>
                <div className="line"></div>
                <div className="topnav">

                    <button
                        className={ currentWindow === WINDOW_STATES.FRIENDS ? 'active' : null }
                        onClick={() => handleClick(WINDOW_STATES.FRIENDS)}
                    >
                        Accepted
                    </button>

                    <button
                        className={ currentWindow === WINDOW_STATES.FRIENDREQUESTS ? 'active' : null }
                        onClick={() => handleClick(WINDOW_STATES.FRIENDREQUESTS)}
                    >
                        Pending
                    </button>

                    <button
                        className="add"
                        onClick={() => handleClick(WINDOW_STATES.ADDFRIENDS)}
                    >
                        Add Friends
                    </button>

                </div>
            </div>
            </div>
        </>
    )
}

export default FriendTopPanel;