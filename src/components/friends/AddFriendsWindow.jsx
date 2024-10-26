import React, {useState} from "react";
import useFriendApi from "../hooks/useFriendApi.jsx";

function AddFriendsWindow() {
    const { sendFriendRequest } = useFriendApi()
    const [ input, setInput ] = useState('');
    const [ message, setMessage ] = useState('');

    const onSendClick = async (userId) => {
        const response = await sendFriendRequest(userId)

        if (response.status === 201 || response.status === 204)
            setMessage(`Your friend request to ${userId} was sent.`)

        else if (response.status === 500 )
            setMessage('An unexpected error has occurred in the server, please try again.')

        else
            setMessage(response.data)
    }

    return(
        <>
            <div className="example">
                <input type="text" placeholder="Search a friend by username..." name="search"
                       onChange={(e) => setInput(e.target.value)}/>
                <button type="submit"><i className="bi bi-search" onMouseDown={() => onSendClick(input)}></i></button>
            </div>
            <p className="success-message">{message}</p>
        </>
    )
}

export default AddFriendsWindow;