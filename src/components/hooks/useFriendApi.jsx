import {useContext} from 'react';
import {LoginContext} from "/src/Contexts/LoginContext.jsx";
import {useApi} from "./useApi.js";

function useFriendApi () {
    const { userId: loggedInUserId } = useContext(LoginContext);
    const { callApi } = useApi()

    const fetchFriends = async () => {
        return await callApi(`http://localhost:5046/api/Friend/FetchFriends/${loggedInUserId}`)
    }

    const fetchIncomingFriendRequests = async () => {
        return await callApi(`http://localhost:5046/api/Friend/FetchIncomingFriendRequests/${loggedInUserId}`)
    }

    const fetchOutgoingFriendRequests = async () => {
        return await callApi(`http://localhost:5046/api/Friend/FetchOutgoingFriendRequests/${loggedInUserId}`)
    }

    const sendFriendRequest = async (receiverId) => {
        return await callApi(`http://localhost:5046/api/Friend/SendFriendRequest`, { method: 'POST', data: {
                initiatorId: loggedInUserId,
                acceptorId: receiverId,
            }})
    }

    const acceptFriendRequest = async (initiatorId) => {
        return await callApi(`http://localhost:5046/api/Friend/AcceptFriendRequest`, { method: 'PUT', data: {
                initiatorId:initiatorId,
                acceptorId:loggedInUserId
            }})
    }

    const declineFriendRequest = async (initiatorId) => {
        return await callApi(`http://localhost:5046/api/Friend/DeclineFriendRequest`, { method: 'DELETE', data: {
                initiatorId:initiatorId,
                acceptorId:loggedInUserId
            }})
    }

    const removeFriend = async (friendId) => {
        return await callApi(`http://localhost:5046/api/Friend/RemoveFriend/${loggedInUserId}/${friendId}`, { method: 'DELETE' })
    }

    return {
        fetchFriends,
        fetchIncomingFriendRequests,
        fetchOutgoingFriendRequests,
        sendFriendRequest,
        removeFriend,
        acceptFriendRequest,
        declineFriendRequest,
    }
}

export default useFriendApi