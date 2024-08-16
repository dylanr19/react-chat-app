import React, {useEffect, useState} from 'react';
import FriendItem from "./FriendItem.jsx";
import useFriendApi from "../hooks/useFriendApi.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";

function FriendRequestList () {
    const { fetchPotentialFriends, acceptFriendRequest, declineFriendRequest } = useFriendApi()
    const [ originalFriendRequestList, setOriginalFriendRequestList ] = useState([])
    const [ currentFriendRequestList, setCurrentFriendRequestList ] = useState([])

    const fetch = async () => {
        const response = await fetchPotentialFriends()

        if (response.status === 200) {
            setOriginalFriendRequestList(response.data)
            setCurrentFriendRequestList(response.data)
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
                originalList={originalFriendRequestList}
                list={currentFriendRequestList}
                setList={setCurrentFriendRequestList}
                placeholder="Search Friend Requests...">
            </FriendSearchBar>

            <div className="friend-list">
                {
                    currentFriendRequestList.map(p =>
                        <FriendItem
                            name={p.name}
                            userId={p.userId}
                            photoURL={p.photoURL}
                            isPending={true}
                            key={p.userId}
                            onAccept={onAccept}
                            onDelete={onDecline}
                        />)
                }
            </div>
        </>
    )
}

export default FriendRequestList