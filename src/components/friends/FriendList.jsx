import {useContext, useEffect, useState} from 'react';
import usePartnerManager from "../hooks/usePartnerManager.jsx";
import FriendItem from "./FriendItem.jsx";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

function FriendList () {
    const { partnerObj } = usePartnerManager()
    const [ friendList, setFriendList ] = useState([{
        name: "bob",
        userId: "user1",
        photoURL: "none",
        isPending: false,
    }])

    useEffect(() => {
        if (partnerObj.partnerList !== null){
            setFriendList(partnerObj.partnerList)
        }
    }, [partnerObj.partnerList]);

    useEffect(() => {
        partnerObj.fetchFriends()
    }, []);

    return(
        <>
            <div className="friend-list">
                {
                    friendList.map(p =>
                        <FriendItem
                            name={p.name}
                            userId={p.userId}
                            photoURL={p.photoURL}
                            isPending={false}
                            key={p.userId}
                        />)
                }
            </div>
        </>
    )
}

export default FriendList