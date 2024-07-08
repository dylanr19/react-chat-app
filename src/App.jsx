//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import ChatWindow from './ChatWindow.jsx'
import Sidebar from './Sidebar.jsx'
import Searchbar from './Searchbar.jsx'
import Recipientbar from './Recipientbar.jsx'
import Messagebar from './Messagebar.jsx'
import ChatBox from './ChatBox.jsx'

function App() {
  //const [count, setCount] = useState(0)

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
