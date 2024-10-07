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

        if (response.status === 400)
            setMessage('You can not add yourself as a friend.')

        if (response.status === 404)
            setMessage('This user does not exist.')

        if (response.status === 409)
            setMessage('This user is either already a friend or has a pending friend request.')

        else if (response.status === 500)
            setMessage('Server error, please try again.')
    }

    return(
        <>
            <div className="example">
                <input type="text" placeholder="Search by username..." name="search"
                       onChange={(e) => setInput(e.target.value)}/>
                <button type="submit"><i className="bi bi-search" onMouseDown={() => onSendClick(input)}></i></button>
            </div>
            <p className="success-message">{message}</p>
        </>
    )
}

export default AddFriendsWindow;