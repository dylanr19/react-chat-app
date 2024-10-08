import React, {useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";

export const ChangePictureOption = ({ setImageURL }) => {
    const [isChangeImageOpen, setIsChangeImageOpen] = useState(false)
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
                <p className="text">Change Profile Picture</p>
            </div>
            {
                isChangeImageOpen === false ? null :
                    <div className="edit-profile-picture">
                        <input type="file" className="input" onChange={handleChange}></input>
                    </div>
            }
        </>
    )
}