import React, {useEffect, useState} from 'react';
import useFriendApi from "../hooks/useFriendApi.jsx";
import FriendItem from "./FriendItem.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";

function FriendList () {
    const { fetchFriends, removeFriend } = useFriendApi()
    const [ originalFriendList, setOriginalFriendList ] = useState([])
    const [ currentFriendList, setCurrentFriendList ] = useState([])

    const fetch = async () => {
        const response = await fetchFriends()

        if (response.status === 200) {
            setOriginalFriendList(response.data)
        }
    }

    const onDeleteClick = async (userId) => {
        const response = await removeFriend(userId)

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
                friendListStates={[{originalList: originalFriendList, setCurrentList: setCurrentFriendList}]}
                placeholder="Search Friends...">
            </FriendSearchBar>

            {
                currentFriendList.length === 0
                    ?
                    <p className="empty-friend-message">You have no friends.</p>
                    :
                    <div className="friend-list">
                        {
                            currentFriendList.map(p =>
                                <FriendItem
                                    name={p.name}
                                    userId={p.userId}
                                    photoURL={p.photoURL}
                                    isPending={true}
                                    key={p.userId}
                                    showChatButton={true}
                                    showDeleteButton={true}
                                    onDelete={onDeleteClick}
                                />)
                        }
                    </div>
            }
        </>
    )
}

export default FriendList