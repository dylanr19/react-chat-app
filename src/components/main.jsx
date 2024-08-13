import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import {ChatProvider} from "../Contexts/ChatContext.jsx";
import {LoginProvider} from "../Contexts/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LoginProvider>
          <ChatProvider>
              <App />
          </ChatProvider>
      </LoginProvider>
  </React.StrictMode>,
)
