import React, {useContext, useEffect, useState} from 'react';
import {api} from "../../hooks/Api.js";
import {LoginContext} from "../../../Contexts/LoginContext.jsx";
import {useUserApi} from "../../hooks/useUserApi.jsx";
import {RegisterInputContainer} from "./RegisterInputContainer.jsx";
import {validatePassword} from "./validatePassword.js";
import {validateConfirmPassword} from "./validateConfirmPassword.js";
import {validateUsername} from "./validateUsername.js";
import {validateName} from "./validateName.js";
import {hasSpecialCharacters, isEmpty, isNameValid, isWithinLength} from "./validationMethods.js";

const apiURL = import.meta.env.VITE_API_URL

export const Registration = ({ setIsRegistering }) => {
    const { callApi } = api()
    const { createUser } = useUserApi()
    const { setUserId: setLoggedInUserId, setToken: setToken } = useContext(LoginContext)

    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isDisplayNameValid, setIsDisplayNameValid] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)

    const [ displayNameValidationMessage, setDisplayNameValidationMessage ] = useState('')
    const [ usernameValidationMessage, setUsernameValidationMessage ] = useState('')
    const [ passwordValidationMessage, setPasswordValidationMessage ] = useState('')
    const [ confirmPasswordValidationMessage, setConfirmPasswordValidationMessage ] = useState('')

    const [ canRegister, setCanRegister ] = useState(false)
    const [ isRegistrationComplete, setIsRegistrationComplete ] = useState(false)

    const doesUsernameAlreadyExist = async () => {
        const response = await callApi(`${apiURL}/api/User/CheckUsernameExists/${username}`, { method: 'POST' })
        return response.status === 200
    }

    const registerUser = async (e) => {
        e.preventDefault()

        const canRegister = isDisplayNameValid
            && isUsernameValid
            && isPasswordValid
            && isConfirmPasswordValid

        if (canRegister){
            const response = await createUser(displayName, username, password)
            if (response.status === 200) {
                setToken(response.data)
                setIsRegistrationComplete(true)
            } else console.log(response)
        }
    }

    useEffect(() => {
        validateName(
            isEmpty,
            isNameValid,
            setIsDisplayNameValid,
            setDisplayNameValidationMessage,
            isWithinLength,
            displayName,
            hasSpecialCharacters
        )
    }, [displayName]);

    useEffect(() => {
        validateUsername(
            doesUsernameAlreadyExist,
            setIsUsernameValid,
            isEmpty,
            setUsernameValidationMessage,
            isWithinLength,
            username,
            hasSpecialCharacters,
            isNameValid
        )
    }, [username])

    useEffect(() => {
        validatePassword(
            password,
            setIsPasswordValid,
            isEmpty,
            setPasswordValidationMessage
        )
    }, [password]);

    useEffect(() => {
        validateConfirmPassword(
            isEmpty,
            password,
            confirmPassword,
            setIsConfirmPasswordValid,
            setConfirmPasswordValidationMessage
        )
    }, [confirmPassword, password]);

    useEffect(() => {
        const canRegister =
            isDisplayNameValid &&
            isUsernameValid &&
            isPasswordValid &&
            isConfirmPasswordValid

        setCanRegister(canRegister)

    }, [isDisplayNameValid, isUsernameValid, isPasswordValid, isConfirmPasswordValid]);

    useEffect(() => {
        if (isRegistrationComplete)
            setLoggedInUserId(username)
    }, [isRegistrationComplete]);

    return (
        <>
            <div className="register-flex-container">
                <div className="register-container">
                    <h2 className="register-header">Create an account</h2>

                    <form onSubmit={registerUser}>

                        <RegisterInputContainer
                            label={'DISPLAY NAME'}
                            value={displayName}
                            isValid={isDisplayNameValid}
                            validationMessage={displayNameValidationMessage}
                            handleChange={setDisplayName}
                        />

                        <RegisterInputContainer
                            label={'USERNAME'}
                            value={username}
                            isValid={isUsernameValid}
                            validationMessage={usernameValidationMessage}
                            handleChange={setUsername}
                        />

                        <RegisterInputContainer
                            label={'PASSWORD'}
                            value={password}
                            isValid={isPasswordValid}
                            validationMessage={passwordValidationMessage}
                            handleChange={setPassword}
                        />

                        <RegisterInputContainer
                            label={'CONFIRM PASSWORD'}
                            value={confirmPassword}
                            isValid={isConfirmPasswordValid}
                            validationMessage={confirmPasswordValidationMessage}
                            handleChange={setConfirmPassword}
                        />

                        <button className={canRegister ? 'enabled' : 'disabled'} type="submit">REGISTER</button>
                    </form>

                    <p className="login-paragraph" onClick={() => setIsRegistering(false)}>Already have an account?</p>
                </div>

            </div>
        </>
    )
}