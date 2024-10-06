import '../styles/App.css'
import ChatWindow from './chat/ChatWindow.jsx'
import ChatTabsWindow from './sidebar/chat tabs/ChatTabsWindow.jsx'
import OpenFriendsButton from './sidebar/OpenFriendsButton.jsx'
import Recipientbar from './chat/Recipientbar.jsx'
import Messagebar from './chat/Messagebar.jsx'
import FriendWindowManager from "./friends/FriendWindowManager.jsx";
import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../Contexts/ChatContext.jsx";
import PartnerSearchContainer from "./sidebar/search window/PartnerSearchContainer.jsx";
import {AccountPanel} from "./personal info/AccountPanel.jsx";
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
                        <OpenFriendsButton isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}></OpenFriendsButton>
                        <div className={"direct-messages-header"}>DIRECT MESSAGES</div>
                        <ChatTabsWindow></ChatTabsWindow>
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
                            <FriendWindowManager></FriendWindowManager>
                        </div>
                    }
                    <div className="personal-info-container">
                        <AccountPanel></AccountPanel>
                    </div>
                </>
            }
        </div>
    </>
  )
}

export default App
