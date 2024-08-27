//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import '../../styles/App.css'
import React, {useEffect} from "react";

function WindowToggle({ isChatVisible, setIsChatVisible } ) {

    const onButtonClick = () => {
        setIsChatVisible((prev) => !prev);
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

export default WindowToggle
