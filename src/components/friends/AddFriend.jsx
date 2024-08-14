import React, {useEffect, useState} from "react";
import usePartnerManager from "../hooks/usePartnerManager.jsx";

function AddFriend() {
    const { partnerObj } = usePartnerManager()
    const [ input, setInput ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {

        if (partnerObj.isLoading === true) {
            return
        }

        if (input.length === 0) {
            return
        }

        if (partnerObj.error == null) {
            setSuccessMessage(`Your friend request to ${input} was sent.`)
        }

        else if (partnerObj.error.response.status === 409) {
            setSuccessMessage('This user is either already a friend or has a pending friend request.')
            partnerObj.setError(null);
        }
        else if (partnerObj.error.response.status === 500) {
            setSuccessMessage('Server error, please try again.')
            partnerObj.setError(null);
        }

    }, [partnerObj.isLoading]);

    return(
        <>
            <div className="example">
                <input type="text" placeholder="Add Friend..." name="search"
                       onChange={(e) => setInput(e.target.value)}/>
                <button type="submit"><i className="bi bi-search" onClick={() => partnerObj.sendFriendRequest(input)}></i></button>
            </div>
            <p className="success-message">{successMessage}</p>
        </>
    )
}

export default AddFriend;