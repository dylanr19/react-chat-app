import React from 'react';

export const RegisterInputContainer = ({ label, value, handleChange, isValid, validationMessage }) => {

    return (
        <>
            <div className="input-container">
                <label>{label}</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>

            {isValid === false && <div className="validation-message">{validationMessage}</div>}
        </>
    )
}