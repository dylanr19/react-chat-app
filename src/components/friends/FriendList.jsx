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
            setCurrentFriendList(response.data)
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
                originalList={originalFriendList}
                list={currentFriendList}
                setList={setCurrentFriendList}
                placeholder="Search Friends...">
            </FriendSearchBar>

            <div className="friend-list">
                {
                    currentFriendList?.map(p =>
                        <FriendItem
                            name={p.name}
                            userId={p.userId}
                            photoURL={p.photoURL}
                            isPending={false}
                            key={p.userId}
                            onDelete={onDeleteClick}
                            // onChat={}
                        />)
                }
            </div>
        </>
    )
}

export default FriendList