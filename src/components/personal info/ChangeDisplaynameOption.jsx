import React, {useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";

export const ChangeDisplaynameOption = ({ userData, setUserData }) => {
    const [displaynameInput, setDisplaynameInput] = useState('')
    const [isChangeDisplaynameOpen, setIsChangeDisplaynameOpen] = useState(false)
    const {changeDisplayname} = useUserApi()

    const apiChangeUsername = async () => {
        const response = await changeDisplayname(displaynameInput)
        if (response.status === 200){
            setUserData((prev) => ({
                ...prev,
                name: displaynameInput,
            }))
        }
    }

    const toggleChangeUsername = () => {
        setIsChangeDisplaynameOpen(!isChangeDisplaynameOpen)
    }

    return (
        <>
            <div className="displayname">
                <button
                    className={isChangeDisplaynameOpen ? 'bi bi-caret-down' : 'bi bi-caret-right'}
                    onClick={() => toggleChangeUsername()}></button>
                <p className="text">Edit Display Name</p>
            </div>
            {
                isChangeDisplaynameOpen === false ? null :
                    <div className="edit-displayname">
                        <input type="text" className="input" placeholder={userData.name}
                               onChange={(e) => setDisplaynameInput(e.target.value)}></input>
                        <button className="submit" onClick={() => apiChangeUsername()}>Save</button>
                    </div>
            }
        </>
    )
}