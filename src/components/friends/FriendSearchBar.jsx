import React, {useEffect, useState} from "react";

function FriendSearchBar( { friendListStates, placeholder } ) {
    const [ input, setInput ] = useState('');

    useEffect(() => {
        if (input.length === 0){
            friendListStates.forEach(fr => {fr.setCurrentList(fr.originalList)})
            return
        }

        const filterUser = (user, input) => {
            const containsName = user.name.toLowerCase().includes(input.toLowerCase());
            const containsId = user.userId.toLowerCase().includes(input.toLowerCase());
            return containsName || containsId;
        }

        friendListStates.forEach(fr =>
         fr.setCurrentList(
                fr.originalList.filter((item) => filterUser(item, input))
         ))

    }, [input, ...friendListStates.map(({ originalList }) => originalList)]);

    return(
        <>
            <div className="example">
                <input type="text" placeholder={placeholder} name="search" onChange={(e) => setInput(e.target.value)} />
                <button type="submit"><i className="bi bi-search"></i></button>
            </div>
        </>
    )
}

export default FriendSearchBar;