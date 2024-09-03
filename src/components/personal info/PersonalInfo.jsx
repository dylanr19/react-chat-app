import React, {useState} from 'react';

export const PersonalInfo = () => {
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

    const toggleChangeUsername = () => {
        setIsChangeUsernameOpen(!isChangeUsernameOpen);
    }

    const toggleDeleteAccount = () => {
        setIsDeleteAccountOpen(!isDeleteAccountOpen);
    }

    return (
        <>
            <img className="photo"
                 src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"
                 alt="Photo of this user"/>
            <div className="credentials">
                <h3 className="name">Bobby Brian</h3>
                <p className="userID">Bobby23</p>
            </div>
            <div className="member-since-container">
                <h5 className="header">Member Since</h5>
                <p className="date">May 23, 2020</p>
            </div>

            <div className="options-container">
                <h5 className="header">User Options</h5>
                <div className="username">
                    <p className="text">Change Username</p>
                    <button className="bi bi-caret-right" onClick={() => toggleChangeUsername()}></button>
                </div>
                {
                    isChangeUsernameOpen === false ? null :
                        <div className="edit-username">
                            <input type="text" className="input" placeholder="Bobby Brian"></input>
                            <button className="submit">Save</button>
                        </div>
                }
                <div className="delete-account">
                    <p className="text">Delete Account</p>
                    <button className="bi bi-caret-right" onClick={() => toggleDeleteAccount()}></button>
                </div>
                {
                    isDeleteAccountOpen === false ? null :
                        <div className="password-prompt">
                            <input type="text" className="input" placeholder="Type your password..."></input>
                            <button className="submit">Confirm</button>
                        </div>
                }
            </div>
            <div className="logout-button-container">
                <button className="logout-button">logout</button>
            </div>
        </>
    )
}