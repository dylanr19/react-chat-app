import {useContext, useState} from 'react';
import {LoginContext} from "/src/Contexts/LoginContext.jsx";
import {useApi} from "./useApi.js";

function useFriendApi () {
    const { userId: loggedInUserId } = useContext(LoginContext);
    const { callApi } = useApi()

    // const [chatPartner, setChatPartner] = useState(null)
    const [chatPartner, setChatPartner] = useState({
        photoURL: '',
        name: 'Bob',
        userId: 'user2',
        lastMessage: 'lmao',
        isActive: false
    })
    const [partnerList, setPartnerList] = useState([])

    const fetchFriends = async () => {
        return await callApi(`http://localhost:5046/api/Friend/FetchFriends/${loggedInUserId}`)
    }

    const fetchPotentialFriends = async () => {
        return await callApi(`http://localhost:5046/api/Friend/FetchPotentialFriends/${loggedInUserId}`)
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

    const getPartnerData = (Id, list = partnerList) => {
        return list.find(partner => partner.userId === Id)
    }

    const createNewPartner = () => {
        const newPartner = {
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: 'Bobilev',
            userId: 'user31',
            lastMessage: 'lmao',
            isActive: false
        }

        setPartnerList((prev) => prev.concat(newPartner))
    }

    const setPartnerLastMessage = (userId, message) => {
        const partnerListCopy = [...partnerList]
        const partner = getPartnerData(userId)
        partner.lastMessage = message
        setPartnerList(partnerListCopy)
    }

    return {
        getPartnerData,
        createNewPartner,
        setPartnerLastMessage,
        fetchFriends,
        fetchPotentialFriends,
        sendFriendRequest,
        removeFriend,
        acceptFriendRequest,
        declineFriendRequest,
        chatPartner,
        partnerList,
        setChatPartner,
        setPartnerList
    }
}

export default useFriendApi