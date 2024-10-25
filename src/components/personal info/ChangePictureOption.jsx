import React, {useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";

export const ChangePictureOption = ({ setImageURL, setUserData }) => {
    const [ isChangeImageOpen, setIsChangeImageOpen ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState(null)
    const { uploadProfilePictureToImgbb, changeProfilePicture } = useUserApi()

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

    const apiUploadProfilePicture = async (file) => {
        setIsLoading(true)

        // The Imgbb API expects a base64 string sent within form data
        const base64string = await convertToBase64(file);
        const cleanBase64String = base64string.replace(/^data:image\/[^;]+;base64,/, '');
        const formData = new FormData();
        formData.append('image', cleanBase64String);

        // Upload the Image to Imgbb to get the URl to the image
        let response = await uploadProfilePictureToImgbb(formData)
        if (response.status !== 200){
            setErrorMessage( `Could not upload profile picture to Imgbb error ${response.status}`)
            setIsLoading(false)
            return
        } else setErrorMessage(null)

        // Save the URL to the image with user's profile in the db, then display it
        const imgURL = response.data.data.image.url
        // const encodedImgURL = encodeURIComponent(imgURL)
        response = await changeProfilePicture(imgURL)
        if (response.status === 200) {
            setImageURL(imgURL)
            setUserData((prev) => ({
                userId: prev.userId,
                password: prev.password,
                photoURL: imgURL,
                name: prev.name,
                joinDate: prev.joinDate
            }))
            setErrorMessage(null)
        }
        else setErrorMessage(`Could not change profile picture: error ${response.status}`)

        setIsLoading(false)
    }

    const handleChange = async (e) => {
        await apiUploadProfilePicture(e.target.files[0])
    }

    const toggleChangeImage = () => {
        setIsChangeImageOpen(!isChangeImageOpen)
    }

    return (
        <>
            <div className="profile-picture">

                <button
                    className={isChangeImageOpen ? 'bi bi-caret-down' : 'bi bi-caret-right'}
                    onClick={() => toggleChangeImage()}></button>
                <p className="text">Edit Profile Picture</p>

            </div>
            {
                isChangeImageOpen === false ? null :
                    <div className="edit-profile-picture">
                        {isLoading && <div className="loader"></div>}
                        <input type="file"  className="input" onChange={handleChange}/>
                        <div style={{color: 'red', fontSize: 'x-small', paddingLeft: '7px'}}>{errorMessage}</div>
                    </div>
            }
        </>
    )
}