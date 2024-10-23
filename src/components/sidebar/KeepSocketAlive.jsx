import {useContext, useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {ReadyState} from "react-use-websocket";
import {LoginContext} from "../../Contexts/LoginContext.jsx";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const apiURL = import.meta.env.VITE_API_URL_WEBSOCKET

export const KeepSocketAlive = () => {

    const { userId: loggedInUserId, token: token } = useContext(LoginContext)
    const [socketUrl, setSocketUrl] = useState(null)
    const {readyState} = useWebSocket(socketUrl, {
        share: true,

        shouldReconnect: (closeEvent) => true,
        reconnectAttempts: 10,

        // This attempts to reconnect up to 10 times, with an exponentially increasing -
        // delay starting at 1 second and capping at 10 seconds
        // as stated in the docs: https://www.npmjs.com/package/react-use-websocket
        reconnectInterval: (attemptNumber) =>
            Math.min(Math.pow(2, attemptNumber) * 1000, 10000),

        // If the computer goes to sleep it will not receive a close message from the server,
        // therefore when the computer wakes up, it might think the connection is still open,
        // if that is the case, ping the server to check if the oconnection is still open.
        heartbeat: {
            message: 'ping',
            returnMessage: 'pong',
            timeout: 15000,
            interval: 5000,
            // timeout: 60000, // 1 minute, if no response is received, the connection will be closed
            // interval: 25000, // every 25 seconds, a ping message will be sent
        },
    })

    useEffect(() => {
        if (loggedInUserId != null && token != null)
            setSocketUrl(`${apiURL}/ws?userID=${loggedInUserId}&token=${token}`);
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