import React, {useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";

export const DeleteAccountOption = ({ setLoggedInUserId, clearChatContext }) => {
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
    const {deleteUser} = useUserApi()

    const apiDeleteUser = async () => {
        const response = await deleteUser()
        if (response.status === 200){
            setLoggedInUserId(null)
            clearChatContext()
        }
    }

    const toggleDeleteAccount = () => {
        setIsDeleteAccountOpen(!isDeleteAccountOpen)
    }

    return (
        <>
            <div className="delete-account">
                <button
                    className={isDeleteAccountOpen ? 'bi bi-caret-down' : 'bi bi-caret-right'}
                    onClick={() => toggleDeleteAccount()}></button>
                <p className="text">Delete User Profile</p>
            </div>
            {
                isDeleteAccountOpen === false ? null :
                    <div className="password-prompt">
                        <input type="text" className="input" placeholder="Type your password..."></input>
                        <button className="submit" onClick={() => apiDeleteUser()}>Confirm</button>
                    </div>
            }
        </>
    )
}