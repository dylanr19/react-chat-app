import React, {useState} from 'react';
import FriendList from "./FriendList.jsx";
import SearchBar from "./SearchBar.jsx";
import TopNavigationBar from "./TopNavigationBar.jsx";

function FriendWindow () {
    const [ displayFriends, setDisplayFriends ] = useState()
    const [ displayFriendRequests, setDisplayFriendRequests ] = useState()
    const [ displayAddFriends, setDisplayAddFriends ] = useState()


    return (
      <>
          <TopNavigationBar></TopNavigationBar>
          <SearchBar></SearchBar>
          <FriendList></FriendList>
      </>
    );
}

export default FriendWindow