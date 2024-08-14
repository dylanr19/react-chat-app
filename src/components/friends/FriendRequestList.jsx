import React, {useContext, useEffect, useState} from 'react';
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import FriendItem from "./FriendItem.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import usePartnerManager from "../hooks/usePartnerManager.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";
import friendList from "./FriendList.jsx";

function FriendRequestList () {
    const { partnerObj } = usePartnerManager()
    const [ friendRequestList, setFriendRequestList ] = useState([])

    useEffect(() => {
        if (partnerObj.partnerList != null){
            setFriendRequestList(partnerObj.partnerList)
        }
    }, [partnerObj.partnerList]);

    useEffect(() => {
        partnerObj.fetchPotentialFriends()
    }, []);

    return(
        <>
            <FriendSearchBar list={friendRequestList} setList={setFriendRequestList} placeholder="Search Friend Requests..."></FriendSearchBar>

            <div className="friend-list">
                {
                    friendRequestList.map(p =>
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