//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import '../../styles/App.css'
import {useEffect} from "react";

function WindowToggle({ isChatVisible, setIsChatVisible } ) {

    useEffect(() => {

        if (isChatVisible){
            // Show Go-To-Friends Button
        } else {
            // Render Go-To-Chat Button
        }

    }, [isChatVisible]);

    const onButtonClick = () => {
        setIsChatVisible((prev) => !prev);
    }

    return (
        <>
            <div className="toggle-window-button">
                <i className="bi bi-search"></i>
                <button type="text" className="input" onClick={onButtonClick}/>
            </div>
        </>
    )
}

export default WindowToggle
