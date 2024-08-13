import {useContext, useEffect, useState} from 'react';
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import FriendItem from "./FriendItem.jsx";

function FriendRequestList () {
    const { partnerList } = useContext(ChatContext)
    const [ friendRequestList, setFriendRequestList ] = useState([])

    useEffect(() => {
        setFriendRequestList(
            partnerList.filter(p => p.isPending === true)
        )
    }, [partnerList]);

    return(
        <>
            <div className="friend-list">
                {
                    friendRequestList.map(p =>
                        <FriendItem
                            name={p.name}
                            userId={p.userId}
                            photoURL={p.photoURL}
                            isPending={p.isPending}
                            key={p.userId}
                        />)
                }
            </div>
        </>
    )
}

export default FriendRequestList