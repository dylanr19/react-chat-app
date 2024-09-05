import React, {useState} from 'react';
import {Registration} from "./Registration.jsx";
import {Login} from "./Login.jsx";

export const LandingScreen = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <>
            {
                isRegistering ? <Registration setIsRegistering={setIsRegistering}/>
                    : <Login setIsRegistering={setIsRegistering}/>
            }
        </>
    )
}