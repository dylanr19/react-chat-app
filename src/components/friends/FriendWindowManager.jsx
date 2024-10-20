import React, {useState} from 'react';
import FriendListWindow from "./FriendListWindow.jsx";
import SearchBar from "../other/SearchBar.jsx";
import FriendTopPanel from "./FriendTopPanel.jsx";
import FRWindow from "./FRWindow.jsx";
import AddFriendsWindow from "./AddFriendsWindow.jsx";
import {WINDOW_STATES} from "./WINDOW_STATES.js";

function FriendWindowManager () {
    const [ currentWindow, setCurrentWindow ] = useState(WINDOW_STATES.FRIENDS);

    return (
        <>
            <div className="friend-container">
                <FriendTopPanel currentWindow={currentWindow} setCurrentWindow={setCurrentWindow}></FriendTopPanel>
                {currentWindow === WINDOW_STATES.FRIENDS && <FriendListWindow/>}
                {currentWindow === WINDOW_STATES.FRIENDREQUESTS && <FRWindow/>}
                {currentWindow === WINDOW_STATES.ADDFRIENDS && <AddFriendsWindow/>}
            </div>
        </>
    );
}

export default FriendWindowManager