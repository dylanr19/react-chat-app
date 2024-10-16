import React, {useContext, useEffect, useState} from 'react';
import {useUserApi} from "../hooks/useUserApi.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

export const Login = ({ setIsRegistering }) => {
    const { loginUser } = useUserApi()
    const { setUserId: setLoggedInUserId, setToken: setToken } = useContext(LoginContext)
    const [ guest, setGuest] = useState (false)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')

    const login = async (e) => {
        if (e != null)
            e.preventDefault()

        const response = await loginUser(username, password)
        if (response.status === 429){
          setErrorMessage('You got blocked by the server, please try again later.')

        } else if (response.status !== 200){
            setErrorMessage('Login failed, please check your username and password')

        } else {
            setToken(response.data)
            setLoggedInUserId(username)
        }
    }

    const loginAsGuest1 = () => {
        setUsername('guest1')
        setPassword('G@ust0ne12345')
        setGuest(true)
    }

    const loginAsGuest2 = () => {
        setUsername('guest2')
        setPassword('G@ustTw012345')
        setGuest(true)
    }

    useEffect(() => {
        if (guest === true){
            login()
        }
    }, [guest]);

    return (
        <>
            <div className="login-flex-container">
                <div className="login-container">
                    <h2>LOGIN</h2>

                    <form onSubmit={login}>
                        <div className="input-container">
                            <div className="icon-container">
                                <i className="bi bi-person"></i>
                            </div>
                            <input type="text" placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="input-container">
                            <div className="icon-container">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                            <input type="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <input className="login-button" type="submit" value="Login Now"/>
                    </form>

                    {
                        errorMessage === '' ? null :
                            <div style={{color: 'red', fontSize: '12px', paddingTop: '5px'}}>{errorMessage}</div>
                    }

                    <p className="register-paragraph">Need an account? <span
                        onClick={() => setIsRegistering(true)}>Register</span></p>

                    <p className="guest-paragraph">Login as Guest 1 <span
                        onClick={loginAsGuest1}>Login</span></p>

                    <p className="guest-paragraph">Login as Guest 2 <span
                        onClick={loginAsGuest2}>Login</span></p>
                </div>

                <p className="freepik-attribution">Designed by Freepik.com</p>
            </div>
        </>
    )
}