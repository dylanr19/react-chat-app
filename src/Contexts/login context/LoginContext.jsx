import {createContext, useEffect, useState} from 'react';

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [loggedInUserId, setLoggedInUserId] = useState('')

    useEffect(() => {
        setLoggedInUserId('user1')
    }, []);

    return (
        <LoginContext.Provider value={{ userId: loggedInUserId, setUserId: setLoggedInUserId }}>
            {children}
        </LoginContext.Provider>
    );
};
