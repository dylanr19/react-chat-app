import React, {useContext, useEffect, useState} from 'react';
import useFriendApi from "../hooks/useFriendApi.jsx";
import FriendItem from "./FriendItem.jsx";
import SearchBar from "../other/SearchBar.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import FriendSearchComponent from "./FriendSearchComponent.jsx";
import {FriendContext} from "../../Contexts/FriendContext.jsx";

function FriendListWindow () {
    const { startNewChat, removeChatTab } = useContext(ChatContext);
    const { friendRemovedNotification, friendRequestRespondedNotification } = useContext(FriendContext);
    const { fetchFriends, removeFriend } = useFriendApi()
    const [ originalFriendList, setOriginalFriendList ] = useState(null)
    const [ currentFriendList, setCurrentFriendList ] = useState(null)
    const [ noFriendsMessage, setNoFriendsMessage ] = useState('')

    const refreshFriendList = async () => {
        const response = await fetchFriends()

        if (response.status === 200) {
            setOriginalFriendList(response.data)
        }
    }

    const onDeleteClick = async (userId) => {
        const response = await removeFriend(userId)

        if (response.status === 200){
            removeChatTab(userId)
            refreshFriendList()
        }
    }

    const onChatClick = async (user)=> {
        startNewChat(user)
    }

    // Prevent short ui flickering due to message displaying before the list has fetched.
    useEffect(() => {
        if (originalFriendList != null && originalFriendList.length === 0){
            setNoFriendsMessage('You currently have no friends. Check out the \'Add Friends\' section to connect with others.')
        }
        else setNoFriendsMessage(null)
    }, [originalFriendList]);

    useEffect(() => {
            refreshFriendList()
    }, [friendRemovedNotification, friendRequestRespondedNotification]);

    return(
        <>
            <SearchBar
                ListStates={[{originalList: originalFriendList, setCurrentList: setCurrentFriendList}]}
                placeholder="Find a friend..."
                SearchComponent={FriendSearchComponent}
            >
            </SearchBar>

                    <p className="empty-friend-message">{noFriendsMessage}</p>

            {
                currentFriendList != null &&
                <div className="friend-list">
                    {
                        currentFriendList.map(fr =>
                            <FriendItem
                                userData={fr}
                                key={fr.userId}
                                showChatButton={true}
                                showDeleteButton={true}
                                onDelete={onDeleteClick}
                                onChat={onChatClick}
                            />)
                    }
                </div>
            }
        </>
    )
}

export default FriendListWindow