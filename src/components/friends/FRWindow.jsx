import React, {useContext, useEffect, useState} from 'react';
import FriendItem from "./FriendItem.jsx";
import useFriendApi from "../hooks/useFriendApi.jsx";
import SearchBar from "../other/SearchBar.jsx";
import FriendSearchComponent from "./FriendSearchComponent.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";
import {TYPES} from "./TYPES.js";

function FRWindow () {
    const { fetchIncomingFriendRequests, fetchOutgoingFriendRequests, acceptFriendRequest, declineFriendRequest } = useFriendApi()
    const { friendRequestRespondedNotification, friendRequestReceivedNotification } = useContext(FriendContext);

    const [ originalOutgoingList, setOriginalOutgoingList ] = useState([])
    const [ currentOutgoingList, setCurrentOutgoingList ] = useState([])

    const [ originalIncomingList, setOriginalIncomingList ] = useState([])
    const [ currentIncomingList, setCurrentIncomingList ] = useState([])

    const fetchRequests = async () => {
        const response1 = await fetchIncomingFriendRequests()
        const response2 = await fetchOutgoingFriendRequests()

        if (response1.status === 200) {
            setOriginalIncomingList(response1.data)
        }

        if (response2.status === 200) {
            setOriginalOutgoingList(response2.data)
        }
    }

    const handleAccept = async (userId) => {
        const response = await acceptFriendRequest(userId)
        if (response.status === 200){
            fetchRequests()
        }
    }

    const handleDecline = async (userId) => {
        const response = await declineFriendRequest(userId)
        if (response.status === 200){
            fetchRequests()
        }
    }

    useEffect(() => {
        fetchRequests()
    }, []);

    useEffect(() => {
        if (friendRequestReceivedNotification != null
            && friendRequestRespondedNotification != null)
            fetchRequests()
    }, [friendRequestRespondedNotification, friendRequestReceivedNotification]);

    const RenderFriendList = (type) => {
        let header = '';
        let emptyMessage = '';
        let list = '';

        if (type === TYPES.INCOMING) {
            header = 'Incoming'
            emptyMessage = 'There are no incoming friend requests.'
            list = currentIncomingList

        } else if (type === TYPES.OUTGOING) {
            header = 'Outgoing'
            emptyMessage = 'There are no outgoing friend requests.'
            list = currentOutgoingList
        }

        return (
            <>
                <h4 className="friend-requests-header">{header}</h4>
                { list.length === 0 ?
                        <p className="empty-friend-message">{emptyMessage}</p>
                        :
                        <div className="friend-list">
                            {list.map(fr =>
                                    <FriendItem
                                        userData={fr}
                                        key={fr.userId}
                                        showDeleteButton={true}
                                        onAccept={handleAccept}
                                        onDelete={handleDecline}
                                    />)}
                        </div> }
            </>
        )
    }

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

            {RenderFriendList(TYPES.OUTGOING)}
            {RenderFriendList(TYPES.INCOMING)}
        </>
    )
}

export default FRWindow