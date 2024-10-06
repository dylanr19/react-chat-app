import '../../styles/App.css'
import React from "react";

function OpenFriendsButton({ isChatVisible, setIsChatVisible } ) {

    const onButtonClick = () => {
        setIsChatVisible(false);
    }

    return (
        <>
            <div className="toggle-window-button">
                <button type="text" className="input" onClick={onButtonClick}>
                    <div className="bi bi-person-raised-hand"></div>
                    <div className="text">Friends</div>
                </button>
            </div>
        </>
    )
}

export default OpenFriendsButton
