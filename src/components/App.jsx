import '../styles/App.css'
import ChatWindow from './chat/ChatWindow.jsx'
import ChatTabsWindow from './sidebar/chat tabs/ChatTabsWindow.jsx'
import OpenFriendsButton from './sidebar/OpenFriendsButton.jsx'
import Recipientbar from './chat/Recipientbar.jsx'
import Messagebar from './chat/Messagebar.jsx'
import FriendWindowManager from "./friends/FriendWindowManager.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {ChatContext} from "../Contexts/ChatContext.jsx";
import ChatTabSearchContainer from "./sidebar/search window/ChatTabSearchContainer.jsx";
import {AccountPanel} from "./personal info/AccountPanel.jsx";
import {LoginContext} from "../Contexts/LoginContext.jsx";
import {LandingScreen} from "./landing screen/LandingScreen.jsx";

function App() {
    const { openChatTab, unhighlightChatTab } = useContext(ChatContext)
    const { userId: loggedInUserId } = useContext(LoginContext)
    const [ isChatVisible, setIsChatVisible ] = useState(false)

    const accountPanelRef = useRef(null)
    const sidebarRef = useRef(null)
    const friendRef = useRef(null)
    const chatWindowRef = useRef(null)

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480); // You can adjust 768px as the mobile breakpoint
        };

        handleResize(); // Run on mount to set initial state
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsChatVisible(openChatTab != null)
    }, [openChatTab])

    useEffect(() => {
        if (isChatVisible === false) {
            unhighlightChatTab()
        }

        if (isMobile) {
            isChatVisible ? displayMobileChat() : displayMobileFriends()
        }
    }, [isChatVisible]);


    //TODO: soms is een ref null omdat het niet in de dom zit
    const displayMobileAccountPanel = () => {
        if (friendRef.current != null) friendRef.current.style.display = 'none'
        if (chatWindowRef.current != null) chatWindowRef.current.style.display = 'none'
        sidebarRef.current.style.display = 'none'
        accountPanelRef.current.style.display = 'flex'
    }

    const displayMobileChat = () => {
        if (friendRef.current != null) friendRef.current.style.display = 'none'
        if (chatWindowRef.current != null) chatWindowRef.current.style.display = 'flex'
        sidebarRef.current.style.display = 'none'
        accountPanelRef.current.style.display = 'none'
    }

    const displayMobileFriends = () => {
        if (friendRef.current != null) friendRef.current.style.display = 'flex'
        if (chatWindowRef.current != null) chatWindowRef.current.style.display = 'none'
        if (sidebarRef.current != null) sidebarRef.current.style.display = 'none'
        if (accountPanelRef.current != null) accountPanelRef.current.style.display = 'none'
    }

    const displayMobileSidebar = () => {
        if (friendRef.current != null) friendRef.current.style.display = 'none'
        if (chatWindowRef.current != null) chatWindowRef.current.style.display = 'none'
        sidebarRef.current.style.display = 'flex'
        accountPanelRef.current.style.display = 'none'
    }

    const displayMobileFriendsOrChat = () => {
        if(isChatVisible){
            displayMobileChat()
        }  else {
            displayMobileFriends()
        }
    }

    const closeChatMobile = () => {
        setIsChatVisible(false)
    }

  return (
    <>
        <div className="app-container">
            {
                loggedInUserId == null ? <LandingScreen /> :
                    <>
                        <div className="mobile-top-nav">
                            <button className="open-sidebar-button" onClick={displayMobileSidebar}>menu</button>
                            <button className="open-friends-button" onClick={displayMobileFriendsOrChat}>friends</button>
                            <button className="open-account-panel-button" onClick={displayMobileAccountPanel}>account</button>
                        </div>
                    <div className={"sidebar-container"} ref={sidebarRef}>
                        <ChatTabSearchContainer isChatVisible={isChatVisible}
                                                setIsChatVisible={setIsChatVisible}></ChatTabSearchContainer>
                        <OpenFriendsButton isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible}></OpenFriendsButton>
                        <div className={"direct-messages-header"}>DIRECT MESSAGES</div>
                        <ChatTabsWindow></ChatTabsWindow>
                    </div>
                    {
                        isChatVisible ?
                        <div className={"chatWindow-container"} ref={chatWindowRef}>
                            <button className="close-chatwindow-button" onClick={closeChatMobile}>close</button>
                            <Recipientbar></Recipientbar>
                            <ChatWindow></ChatWindow>
                            <Messagebar></Messagebar>
                        </div>
                        :
                        <div className="friend-container" ref={friendRef}>
                            <FriendWindowManager></FriendWindowManager>
                        </div>
                    }
                    <div className="account-panel" ref={accountPanelRef}>
                        <AccountPanel></AccountPanel>
                    </div>
                    </>
            }
        </div>
    </>
  )
}

export default App
