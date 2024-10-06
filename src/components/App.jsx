import '../styles/App.css'
import ChatWindow from './chat/ChatWindow.jsx'
import Sidebar from './sidebar/Sidebar.jsx'
import WindowToggle from './sidebar/WindowToggle.jsx'
import Recipientbar from './chat/Recipientbar.jsx'
import Messagebar from './chat/Messagebar.jsx'
import FriendWindow from "./friends/FriendWindow.jsx";
import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../Contexts/ChatContext.jsx";
import PartnerSearchContainer from "./sidebar/PartnerSearchContainer.jsx";
import {PersonalInfo} from "./personal info/PersonalInfo.jsx";
import {LoginContext} from "../Contexts/LoginContext.jsx";
import {LandingScreen} from "./landing screen/LandingScreen.jsx";

function App() {
    const { openChatTab, unhighlightChatTab } = useContext(ChatContext)
    const { userId: loggedInUserId } = useContext(LoginContext)
    const [ isChatVisible, setIsChatVisible ] = useState(false)

    useEffect(() => {
        setIsChatVisible(openChatTab != null)
    }, [openChatTab])

    useEffect(() => {
        if (isChatVisible === false)
            unhighlightChatTab()
    }, [isChatVisible]);

  return (
    <>
        <div className="app-container">
            {
                loggedInUserId == null ? <LandingScreen /> :
                    <>
                    <div className={"sidebar-container"}>
                        <PartnerSearchContainer isChatVisible={isChatVisible}
                                                setIsChatVisible={setIsChatVisible}></PartnerSearchContainer>
                        <WindowToggle isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}></WindowToggle>
                        <div className={"direct-messages-header"}>DIRECT MESSAGES</div>
                        <Sidebar></Sidebar>
                    </div>
                    {
                        isChatVisible ?
                        <div className={"chatWindow-container"}>
                            <Recipientbar></Recipientbar>
                            <ChatWindow></ChatWindow>
                            <Messagebar></Messagebar>
                        </div>
                        :
                        <div className="friend-container">
                            <FriendWindow></FriendWindow>
                        </div>
                    }
                    <div className="personal-info-container">
                        <PersonalInfo></PersonalInfo>
                    </div>
                </>
            }
        </div>
    </>
  )
}

export default App
