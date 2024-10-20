import ChatTabSearchContainer from "./search window/ChatTabSearchContainer.jsx";
import OpenFriendsButton from "./OpenFriendsButton.jsx";
import ChatTabsWindow from "./chat tabs/ChatTabsWindow.jsx";

export const SidebarContainer = ({ isChatVisible, setIsChatVisible }) => {

    return (
        <>
            <div className={"sidebar-container"}>
                <ChatTabSearchContainer />
                <OpenFriendsButton isChatVisible={isChatVisible}
                                   setIsChatVisible={setIsChatVisible}></OpenFriendsButton>
                <div className={"direct-messages-header"}>DIRECT MESSAGES</div>
                <ChatTabsWindow />
            </div>
        </>
    )
}