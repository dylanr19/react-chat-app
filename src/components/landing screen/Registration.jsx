import React from 'react';

export const Registration = ({ setIsRegistering }) => {

    return (
        <>
            <div className="register-flex-container">
                <div className="register-container">
                    <h2 className="register-header">Create an account</h2>

                    <form>
                        <label>DISPLAY NAME</label>
                        <input type="text"/>
                        <label>USERNAME</label>
                        <input type="text"/>
                        <label>PASSWORD</label>
                        <input type="text"/>
                        <button type="submit">REGISTER</button>
                    </form>

                    <p className="login-paragraph" onClick={() => setIsRegistering(false)}>Already have an account?</p>
                </div>
            </div>
        </>
    )
}