import {useContext} from 'react';
import {LoginContext} from "/src/Contexts/LoginContext.jsx";
import {api} from "./Api.js";

function useFriendApi () {
    const { userId: loggedInUserId, token: token } = useContext(LoginContext);
    const { callApi } = api()

    const fetchFriends = async () => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/FetchFriends/${loggedInUserId}`)
    }

    const fetchIncomingFriendRequests = async () => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/FetchIncomingFriendRequests/${loggedInUserId}`)
    }

    const fetchOutgoingFriendRequests = async () => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/FetchOutgoingFriendRequests/${loggedInUserId}`)
    }

    const sendFriendRequest = async (receiverId) => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/SendFriendRequest/${loggedInUserId}/${receiverId}/${token}`, {method: 'POST'})
    }

    const acceptFriendRequest = async (initiatorId) => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/AcceptFriendRequest/${initiatorId}/${loggedInUserId}/${token}`, { method: 'PUT' })
    }

    const declineFriendRequest = async (initiatorId) => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/DeclineFriendRequest/${initiatorId}/${loggedInUserId}/${token}`, { method: 'DELETE' })
    }

    const removeFriend = async (friendId) => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/Friend/RemoveFriend/${loggedInUserId}/${friendId}/${token}`, { method: 'DELETE' })
    }

    const fetchOnlineStatus = async (userId) => {
        return await callApi(`https://backend-dylan.azurewebsites.net/api/User/FetchStatus/${userId}`)
    }

    return {
        fetchFriends,
        fetchIncomingFriendRequests,
        fetchOutgoingFriendRequests,
        sendFriendRequest,
        removeFriend,
        acceptFriendRequest,
        declineFriendRequest,
        fetchOnlineStatus,
    }
}

export default useFriendApi