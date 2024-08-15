import React, {useEffect, useState} from 'react';
import FriendItem from "./FriendItem.jsx";
import usePartnerManager from "../hooks/usePartnerManager.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";

function FriendRequestList () {
    const { partnerObj } = usePartnerManager()
    const [ currentFriendRequestList, setCurrentFriendRequestList ] = useState([])

    useEffect(() => {

        if (partnerObj.partnerList != null)
            setCurrentFriendRequestList(partnerObj.partnerList)

    }, [partnerObj.partnerList]);

    useEffect(() => {
        partnerObj.fetchPotentialFriends()
    }, []);

    return(
        <>
            <FriendSearchBar
                originalList={partnerObj.partnerList}
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
                        />)
                }
            </div>
        </>
    )
}

export default FriendRequestList