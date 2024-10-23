import '../styles/App.css'
import FriendWindowManager from "./friends/FriendWindowManager.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {ChatContext} from "../Contexts/ChatContext.jsx";
import {AccountPanel} from "./personal info/AccountPanel.jsx";
import {LoginContext} from "../Contexts/LoginContext.jsx";
import {LandingScreen} from "./landing screen/LandingScreen.jsx";
import {ChatContainer} from "./chat/ChatContainer.jsx";
import {SidebarContainer} from "./sidebar/SidebarContainer.jsx";
import {MobileNavContainer} from "./mobile/MobileNavContainer.jsx";
import {KeepSocketAlive} from "./sidebar/KeepSocketAlive.jsx";

function App() {
    const { openChatTab, setOpenChatTab, unhighlightChatTab } = useContext(ChatContext)
    const { userId: loggedInUserId } = useContext(LoginContext)
    const [ isChatVisible, setIsChatVisible ] = useState(false)

    useEffect(() => {
        // user opens a chat tab = render chat container,
        // user closes a chat tab = render friend container
        setIsChatVisible(openChatTab != null)
    }, [openChatTab])

    useEffect(() => {
        if (isChatVisible === false) {
            unhighlightChatTab()
            setOpenChatTab(null)
        }
    }, [isChatVisible]);


  return (
    <>
        <div className="app-container">
            {
                loggedInUserId == null ? <LandingScreen /> :
                    <>
                        <MobileNavContainer isChatVisible={isChatVisible}></MobileNavContainer>
                        <SidebarContainer isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}/>
                        { isChatVisible ? <ChatContainer setIsChatVisible={setIsChatVisible}/> : <FriendWindowManager /> }
                        <AccountPanel />
                        <KeepSocketAlive />
                    </>
            }
        </div>
    </>
  )
}

export default App
