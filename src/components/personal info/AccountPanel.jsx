import React, {useContext, useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";

export const AccountPanel = () => {
    const {userId: loggedInUserId, setUserId: setLoggedInUserId} = useContext(LoginContext)
    const { clearChatContext } = useContext(ChatContext)

    const [usernameInput, setUsernameInput] = useState('')
    const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false)
    const [isChangeImageOpen, setIsChangeImageOpen] = useState(false)
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

    const { uploadProfilePictureToImgbb, changeProfilePicture } = useUserApi()
    const [imageURL, setImageURL] = useState('');
    async function convertToBase64(file) {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.readAsDataURL(file); // Read the file as a data URL (Base64)

            reader.onload = () => {
                resolve(reader.result); // This will be the Base64 string
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleChange = async (e) => {
        await apiUploadProfilePicture(e.target.files[0])
    }

    const {fetchUser, deleteUser, changeUsername} = useUserApi()
    const [userData, setUserData] = useState({
        userId: null,
        password: null,
        photoURL: null,
        name: null,
        joinDate: null
    })

    useEffect(() => {
        const formatDate = ( response ) => {
            const date = new Date(response.data.joinDate);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            response.data.joinDate = date.toLocaleDateString('en-US', options);
        }

        const fetchUserData = async () => {
            const response = await fetchUser()
            if (response.status === 200) {
                formatDate(response)
                setUserData(response.data)
            }
        }

        fetchUserData()
    }, [loggedInUserId]);

    useEffect(() => {
        setImageURL(userData.photoURL)
    }, [userData]);

    const apiChangeUsername = async () => {
        const response = await changeUsername(usernameInput)
        if (response.status === 200){
            setUserData((prev) => ({
                ...prev,
                name: usernameInput,
            }))
        }
    }

    const apiUploadProfilePicture = async (file) => {
        // The Imgbb API expects a clean base64 string sent within form data
        const base64string = await convertToBase64(file);
        const cleanBase64String = base64string.replace(/^data:image\/[^;]+;base64,/, '');
        const formData = new FormData();
        formData.append('image', cleanBase64String);

        // Upload the Image to Imgbb to get a URL
        let response = await uploadProfilePictureToImgbb(formData)
        if (response.status !== 200){
            console.log( `Could not upload profile picture to Imgbb ${response.status}`)
            return
        }

        // Save the URL to the image in the user's profile in the db, then display it
        const imgURL = response.data.data.image.url
        const encodedImgURL = encodeURIComponent(imgURL)
        response = await changeProfilePicture(encodedImgURL)
        if (response.status === 200) setImageURL(imgURL)
        else console.log(`Could not change profile picture: ${response.status}`)
    }

    const apiDeleteUser = async () => {
        const response = await deleteUser()
        if (response.status === 200){
            setLoggedInUserId(null)
        }
    }

    const toggleChangeUsername = () => {
        setIsChangeUsernameOpen(!isChangeUsernameOpen)
    }

    const toggleChangeImage = () => {
        setIsChangeImageOpen(!isChangeImageOpen)
    }

    const toggleDeleteAccount = () => {
        setIsDeleteAccountOpen(!isDeleteAccountOpen)
    }

    return (
        <>
            <img className="photo"
                 src={imageURL === 'none' || imageURL == null ? 'src/assets/profile picture placeholder.jpg' : imageURL}
                 alt="Photo of this user"
            />
            <div className="credentials">
                <h3 className="name">{userData.name}</h3>
                <p className="userID">{userData.userId}</p>
            </div>
            <div className="member-since-container">
                <h5 className="header">Member Since</h5>
                <p className="date">{userData.joinDate}</p>
            </div>

            <div className="options-container">
                <h5 className="header">User Options</h5>

                <div className="profile-picture">
                    <p className="text">Change Profile Picture</p>
                    <button className="bi bi-caret-right" onClick={() => toggleChangeImage()}></button>
                </div>
                {
                    isChangeImageOpen === false ? null :
                        <div className="edit-profile-picture">
                            <input type="file" className="input" onChange={handleChange}></input>
                        </div>
                }

                <div className="username">
                    <p className="text">Change Username</p>
                    <button className="bi bi-caret-right" onClick={() => toggleChangeUsername()}></button>
                </div>
                {
                    isChangeUsernameOpen === false ? null :
                        <div className="edit-username">
                            <input type="text" className="input" placeholder={userData.name}
                                   onChange={(e) => setUsernameInput(e.target.value)}></input>
                            <button className="submit" onClick={() => apiChangeUsername()}>Save</button>
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
                            <button className="submit" onClick={() => apiDeleteUser()}>Confirm</button>
                        </div>
                }
            </div>

            <div className="logout-button-container">
                <button className="logout-button" onClick={() => {
                    setLoggedInUserId(null);
                    clearChatContext();
                }}>Logout
                </button>
            </div>
        </>
    )
}