import '../../styles/App.css'
import React, {useContext, useEffect, useState} from "react";
import SearchBar from "../reusable components/SearchBar.jsx";
import PartnerSearchComponent from "./PartnerSearchComponent.jsx";
import {ChatContext} from "../../Contexts/ChatContext.jsx";

function PartnerSearchContainer() {
    const { chatPartners,  setFilteredChatPartners } = useContext(ChatContext)

    return (
        <SearchBar
            placeholder={"Find a conversation"}
            ListStates={[{originalList: chatPartners, setCurrentList: setFilteredChatPartners}]}
            SearchComponent={PartnerSearchComponent}>
        </SearchBar>
    )
}

export default PartnerSearchContainer
