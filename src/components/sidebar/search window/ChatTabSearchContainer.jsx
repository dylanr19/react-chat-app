import '../../../styles/App.css'
import React, {useContext, useEffect, useState} from "react";
import SearchBar from "../../reusable components/SearchBar.jsx";
import ChatTabSearchBar from "./ChatTabSearchBar.jsx";
import {ChatContext} from "../../../Contexts/ChatContext.jsx";

function ChatTabSearchContainer() {
    const { chatTabs, setFilteredChatTabs } = useContext(ChatContext)

    return (
        <SearchBar
            placeholder={"Find a conversation"}
            ListStates={[{originalList: chatTabs, setCurrentList: setFilteredChatTabs}]}
            SearchComponent={ChatTabSearchBar}>
        </SearchBar>
    )
}

export default ChatTabSearchContainer
