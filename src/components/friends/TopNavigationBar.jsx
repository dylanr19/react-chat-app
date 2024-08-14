import React, {useEffect, useState} from "react";
import {WINDOW_STATES} from "./WINDOW_STATES.js";

function TopNavigationBar({ setCurrentWindow }) {
    const [ isFriendsButtonActive, setIsFriendsButtonActive] = useState(true);
    const [ isFriendRequestsButtonActive, setIsFriendRequestsButtonActive] = useState(false);
    const [ isAddFriendsButtonActive, setIsAddFriendsButtonActive] = useState(false);

    useEffect(() => {

        if (isFriendsButtonActive){
            setIsAddFriendsButtonActive(false);
            setIsFriendRequestsButtonActive(false);
        }

    }, [isFriendsButtonActive]);

    useEffect(() => {

        if (isFriendRequestsButtonActive){
            setIsAddFriendsButtonActive(false);
            setIsFriendsButtonActive(false);
        }

    }, [isFriendRequestsButtonActive]);

    useEffect(() => {

        if (isAddFriendsButtonActive){
            setIsFriendsButtonActive(false);
            setIsFriendRequestsButtonActive(false);
        }

    }, [isAddFriendsButtonActive]);

    return(
        <>
            <div className="top-navigation-container">
                <div className="bi bi-person-raised-hand"></div>
                <h3 className="title">Friends</h3>
                <div className="line"></div>
                <div className="topnav">

                    <button
                        className={ isFriendsButtonActive ? 'active' : null }
                        onClick={(e) => {
                           e.preventDefault();
                            setCurrentWindow(WINDOW_STATES.FRIENDS)
                            setIsFriendsButtonActive(true)
                    }}
                    >Accepted
                    </button>

                    <button
                        className={ isFriendRequestsButtonActive ? 'active' : null }
                        onClick={(e) => {
                        e.preventDefault();
                        setCurrentWindow(WINDOW_STATES.FRIENDREQUESTS);
                        setIsFriendRequestsButtonActive(true)
                    }}
                    >Pending
                    </button>

                    <button
                        className="add"
                        onClick={(e) => {
                        e.preventDefault();
                        setCurrentWindow(WINDOW_STATES.ADDFRIENDS);
                        setIsAddFriendsButtonActive(true)
                    }}
                    >Add Friends
                    </button>

                </div>
            </div>
        </>
    )
}

export default TopNavigationBar;