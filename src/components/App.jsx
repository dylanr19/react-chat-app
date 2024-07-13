import '../styles/App.css'
import ChatWindow from './chat/ChatWindow.jsx'
import Sidebar from './sidebar/Sidebar.jsx'
import Searchbar from './sidebar/Searchbar.jsx'
import Recipientbar from './chat/Recipientbar.jsx'
import Messagebar from './chat/Messagebar.jsx'

function App() {


  return (
    <>
        <div className="app-container">

            <div className={"sidebar-container"}>
                <Searchbar></Searchbar>
                <Sidebar></Sidebar>
            </div>

            <div className={"chatWindow-container"}>
                <Recipientbar></Recipientbar>
                <ChatWindow></ChatWindow>
                <Messagebar></Messagebar>
            </div>

        </div>
    </>
  )
}

export default App
