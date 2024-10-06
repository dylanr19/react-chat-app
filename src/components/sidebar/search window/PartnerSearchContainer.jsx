import '../../../styles/App.css'
import React, {useContext, useEffect, useState} from "react";
import SearchBar from "../../reusable components/SearchBar.jsx";
import PartnerSearchComponent from "./PartnerSearchComponent.jsx";
import {ChatContext} from "../../../Contexts/ChatContext.jsx";

function PartnerSearchContainer() {
    const { chatTabs,  setFilteredChatTabs } = useContext(ChatContext)

    return (
        <SearchBar
            placeholder={"Find a conversation"}
            ListStates={[{originalList: chatTabs, setCurrentList: setFilteredChatTabs}]}
            SearchComponent={PartnerSearchComponent}>
        </SearchBar>
    )
}

export default PartnerSearchContainer
