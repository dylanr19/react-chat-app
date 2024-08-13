import {useContext, useEffect, useState} from 'react';
import {ChatContext} from "../../Contexts/chat context/ChatContext.jsx";
import FriendItem from "./FriendItem.jsx";

function FriendList () {
    const { partnerList } = useContext(ChatContext)
    const [ friendList, setFriendList ] = useState([{
        name: "bob",
        userId: "user1",
        photoURL: "none",
        isPending: false,
    },
        {
            name: "bob2",
            userId: "user2",
            photoURL: "none",
            isPending: false,
        }])

    // useEffect(() => {
    //     setFriendList(
    //         partnerList.filter(p => p.isPending === false)
    //     )
    // }, [partnerList]);

    return(
        <>
            <div className="friend-list">
                {
                    friendList.map(p =>
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

export default FriendList