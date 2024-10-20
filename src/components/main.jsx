import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import {ChatProvider} from "../Contexts/ChatContext.jsx";
import {LoginProvider} from "../Contexts/LoginContext.jsx";
import {ChatMessageProvider} from "../Contexts/ChatMessageContext.jsx";
import {FriendProvider} from "../Contexts/FriendContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LoginProvider>
          <ChatMessageProvider>
              <ChatProvider>
                  <FriendProvider>
                      <App />
                  </FriendProvider>
              </ChatProvider>
          </ChatMessageProvider>
      </LoginProvider>
  </React.StrictMode>,
)
