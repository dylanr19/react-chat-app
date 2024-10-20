import Recipientbar from "./Recipientbar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Messagebar from "./Messagebar.jsx";

export const ChatContainer = ( { setIsChatVisible } ) => {

    return (
        <>
            <div className={"chatWindow-container"}>
                <button className="close-chatwindow-button" onClick={() => setIsChatVisible(false)}>close</button>
                <Recipientbar></Recipientbar>
                <ChatWindow></ChatWindow>
                <Messagebar></Messagebar>
            </div>
        </>
    )
}