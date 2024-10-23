import {useContext, useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {ReadyState} from "react-use-websocket";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {webSocketOptions} from "../../WebSocketOptions.js";

const apiURL = import.meta.env.VITE_API_URL_WEBSOCKET

export const ConnectionLostPopup = () => {

    const { userId: loggedInUserId, token: token } = useContext(LoginContext)
    const [socketUrl, setSocketUrl] = useState(null)
    const {readyState} = useWebSocket(socketUrl, webSocketOptions)

    useEffect(() => {

        if (loggedInUserId != null && token != null){
            setSocketUrl(`${apiURL}/ws?userID=${loggedInUserId}&token=${token}`);
        }

    }, [loggedInUserId, token]);

    return(
        <Popup
            contentStyle={{ borderRadius: '8px', width: '300px'}}
            open={readyState !== ReadyState.OPEN}
            position="center center"
            repositionOnResize={true}
            modal={true}
        >
            <span className="disconnected-pop-up">
                Connection lost. Trying to reconnect...
            </span>
        </Popup>
    )
}