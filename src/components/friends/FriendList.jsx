import React, {useEffect, useState} from 'react';
import usePartnerManager from "../hooks/usePartnerManager.jsx";
import FriendItem from "./FriendItem.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";

function FriendList () {
    const { partnerObj } = usePartnerManager()
    const [ originalFriendList, setOriginalFriendList ] = useState([])
    const [ currentFriendList, setCurrentFriendList ] = useState([])

    useEffect(() => {

        if (partnerObj.partnerList !== null){
            setOriginalFriendList(partnerObj.partnerList)
            setCurrentFriendList(partnerObj.partnerList)
        }

    }, [partnerObj.partnerList]);

    useEffect(() => {
        partnerObj.fetchFriends()
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
                    currentFriendList.map(p =>
                        <FriendItem
                            name={p.name}
                            userId={p.userId}
                            photoURL={p.photoURL}
                            isPending={false}
                            key={p.userId}
                            setOriginalList={setOriginalFriendList}
                            friendList={currentFriendList}
                            setFriendList={setCurrentFriendList}
                            removeFriend={partnerObj.removeFriend}
                        />)
                }
            </div>
        </>
    )
}

export default FriendList