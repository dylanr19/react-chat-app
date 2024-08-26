import React, {useEffect, useState} from 'react';
import FriendItem from "./FriendItem.jsx";
import useFriendApi from "../hooks/useFriendApi.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";

function FriendRequestList () {
    const { fetchIncomingFriendRequests, fetchOutgoingFriendRequests, acceptFriendRequest, declineFriendRequest } = useFriendApi()

    const [ originalOutgoingList, setOriginalOutgoingList ] = useState([])
    const [ currentOutgoingList, setCurrentOutgoingList ] = useState([])

    const [ originalIncomingList, setOriginalIncomingList ] = useState([])
    const [ currentIncomingList, setCurrentIncomingList ] = useState([])

    const fetch = async () => {
        const response1 = await fetchIncomingFriendRequests()
        const response2 = await fetchOutgoingFriendRequests()

        if (response1.status === 200) {
            setOriginalIncomingList(response1.data)
        }

        if (response2.status === 200) {
            setOriginalOutgoingList(response2.data)
        }
    }

    const onAccept = async (userId) => {
        const response = await acceptFriendRequest(userId)

        if (response.status === 200){
            fetch()
        }
    }

    const onDecline = async (userId) => {
        const response = await declineFriendRequest(userId)

        if (response.status === 200){
            fetch()
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    return(
        <>
            <FriendSearchBar
                friendListStates={[
                    {originalList: originalIncomingList, setCurrentList: setCurrentIncomingList},
                    {originalList: originalOutgoingList, setCurrentList: setCurrentOutgoingList}]}
                placeholder="Search Friend Requests...">
            </FriendSearchBar>

            <h4 className="friend-requests-header">Outgoing</h4>

            {
                currentOutgoingList.length === 0
                    ?
                    <p className="empty-friend-message">You have no outgoing friend requests.</p>
                    :
                    <div className="friend-list">
                        {
                            currentOutgoingList.map(fr =>
                                <FriendItem
                                    userData={fr}
                                    key={fr.userId}
                                    showDeleteButton={true}
                                    onAccept={onAccept}
                                    onDelete={onDecline}
                                />)
                        }
                    </div>
            }

            <h4 className="friend-requests-header">Incoming</h4>
            {
                currentIncomingList.length === 0
                    ?
                    <p className="empty-friend-message">You have no incoming friend requests.</p>
                    :
                    <div className="friend-list">
                        {
                            currentIncomingList.map(fr =>
                                <FriendItem
                                    userData={fr}
                                    key={fr.userId}
                                    showAcceptButton={true}
                                    showDeleteButton={true}
                                    onAccept={onAccept}
                                    onDelete={onDecline}
                                />)
                        }
                    </div>
            }
        </>
    )
}

export default FriendRequestList