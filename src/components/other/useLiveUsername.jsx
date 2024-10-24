import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";

export const useLiveUsername = ( firstUsername, userId ) => {
    const [ username, setUsername ] = useState(firstUsername)
    const { changedUsername } = useContext(FriendContext)

    useEffect(() => {
        if (changedUsername != null && changedUsername.userId === userId){
            setUsername(changedUsername.newUsername)
        }
    }, [changedUsername]);

    return {
        username
    }
}