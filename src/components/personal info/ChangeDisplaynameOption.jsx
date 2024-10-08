import React, {useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";

export const ChangeDisplaynameOption = ({ userData, setUserData }) => {
    const [usernameInput, setUsernameInput] = useState('')
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false)
    const {changeUsername} = useUserApi()

    const apiChangeUsername = async () => {
        const response = await changeUsername(usernameInput)
        if (response.status === 200){
            setUserData((prev) => ({
                ...prev,
                name: usernameInput,
            }))
        }
    }

    const toggleChangeUsername = () => {
        setIsChangeUsernameOpen(!isChangeUsernameOpen)
    }

    return (
        <>
            <div className="username">
                <button
                    className={isChangeUsernameOpen ? 'bi bi-caret-down' : 'bi bi-caret-right'}
                    onClick={() => toggleChangeUsername()}></button>
                <p className="text">Change Username</p>
            </div>
            {
                isChangeUsernameOpen === false ? null :
                    <div className="edit-username">
                        <input type="text" className="input" placeholder={userData.name}
                               onChange={(e) => setUsernameInput(e.target.value)}></input>
                        <button className="submit" onClick={() => apiChangeUsername()}>Save</button>
                    </div>
            }
        </>
    )
}