import {useContext, useEffect, useState} from 'react';
import useWebSocket from "react-use-websocket";
import {LoginContext} from "/src/Contexts/LoginContext.jsx";
import {useApi} from "./useApi.js";

function usePartnerManager () {
    const { userId: loggedInUserId } = useContext(LoginContext);
    const { data, isLoading, error, setError, callApi } = useApi()

    // const [chatPartner, setChatPartner] = useState(null)
    const [chatPartner, setChatPartner] = useState({
        photoURL: '',
        name: 'Bob',
        userId: 'user2',
        lastMessage: 'lmao',
        isActive: false
    })
    const [partnerList, setPartnerList] = useState([])

    useEffect(() => {
        if(data !== '')
            setPartnerList(data)
    }, [data]);

    const fetchFriends = () => {
        callApi(`http://localhost:5046/api/Friend/FetchFriends/${loggedInUserId}`)
    }

    const fetchPotentialFriends = () => {
        callApi(`http://localhost:5046/api/Friend/FetchPotentialFriends/${loggedInUserId}`)
    }

    const sendFriendRequest = (receiverId) => {
        callApi(`http://localhost:5046/api/Friend/SendFriendRequest`, { method: 'POST', data: {
                initiatorId: loggedInUserId,
                acceptorId: receiverId,
            }})
    }

    const removeFriend = (friendId) => {
        callApi(`http://localhost:5046/api/Friend/RemoveFriend/${loggedInUserId}/${friendId}`, { method: 'DELETE' })
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
        partnerObj: {
            getPartnerData,
            createNewPartner,
            setPartnerLastMessage,
            fetchFriends,
            fetchPotentialFriends,
            sendFriendRequest,
            removeFriend,
            error,
            setError,
            isLoading,
            chatPartner,
            partnerList,
            setChatPartner,
            setPartnerList
        }
    }
}

export default usePartnerManager