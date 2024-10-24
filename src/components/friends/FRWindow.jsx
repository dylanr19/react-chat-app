import React, {useContext, useEffect, useState} from 'react';
import FriendItem from "./FriendItem.jsx";
import useFriendApi from "../hooks/useFriendApi.jsx";
import SearchBar from "../other/SearchBar.jsx";
import FriendSearchComponent from "./FriendSearchComponent.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";

function FRWindow () {
    const { fetchIncomingFriendRequests, fetchOutgoingFriendRequests, acceptFriendRequest, declineFriendRequest } = useFriendApi()
    const { friendRequestRespondedNotification, friendRequestReceivedNotification } = useContext(FriendContext);

    const [ originalOutgoingList, setOriginalOutgoingList ] = useState(null)
    const [ originalIncomingList, setOriginalIncomingList ] = useState(null)
    const [ currentOutgoingList, setCurrentOutgoingList ] = useState(null)
    const [ currentIncomingList, setCurrentIncomingList ] = useState(null)

    const [ incomingMessage, setIncomingMessage ] = useState('')
    const [ outgoingMessage, setOutgoingMessage ] = useState('')

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
        if (originalIncomingList != null && originalIncomingList.length === 0){
            setIncomingMessage('You have no incoming friend requests.')
        }
    }, [originalIncomingList]);

    useEffect(() => {
        if (originalOutgoingList != null && originalOutgoingList.length === 0){
            setOutgoingMessage('You have no outgoing friend requests.')
        }
    }, [originalOutgoingList]);

    useEffect(() => {
        fetch()
    }, [friendRequestRespondedNotification, friendRequestReceivedNotification]);

    return(
        <>
            <SearchBar
                ListStates={[
                    {originalList: originalIncomingList, setCurrentList: setCurrentIncomingList},
                    {originalList: originalOutgoingList, setCurrentList: setCurrentOutgoingList}]}
                placeholder="Find a friend request..."
                SearchComponent={FriendSearchComponent}
            >
            </SearchBar>

            <h4 className="friend-requests-header">Outgoing</h4>



                    <p className="empty-friend-message">{outgoingMessage}</p>

            {
                currentOutgoingList != null &&
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



                    <p className="empty-friend-message">{incomingMessage}</p>

            {
                currentIncomingList != null &&
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

export default FRWindow