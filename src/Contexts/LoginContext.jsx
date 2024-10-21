import {createContext, useEffect, useState} from 'react';

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [loggedInUserId, setLoggedInUserId] = useState(null)
    const [token, setToken] = useState(null)

    return (
        <LoginContext.Provider value={{
            userId: loggedInUserId,
            setUserId: setLoggedInUserId,
            token: token,
            setToken: setToken
        }}>
            {children}
        </LoginContext.Provider>
    );
};
