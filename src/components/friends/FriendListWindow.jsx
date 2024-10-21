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
    const [ originalFriendList, setOriginalFriendList ] = useState([])
    const [ currentFriendList, setCurrentFriendList ] = useState([])

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

    useEffect(() => {
        refreshFriendList()
    }, []);

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

            {
                currentFriendList.length === 0 ?
                    <p className="empty-friend-message">You have no friends.</p>
                    :
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