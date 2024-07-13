import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import {ChatProvider} from "../chat context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChatProvider>
          <App />
      </ChatProvider>
  </React.StrictMode>,
)
