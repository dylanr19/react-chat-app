import {useEffect, useState} from 'react';
import useWebSocket from "react-use-websocket";

function usePartnerManager () {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:5046/ws')
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(
        socketUrl,
        {share: true}
    );

    // const [chatPartner, setChatPartner] = useState(null)
    const [chatPartner, setChatPartner] = useState({
        photoURL: '',
        name: 'Bob',
        userId: 'user1',
        lastMessage: 'lmao',
        isActive: false
    })
    const [partnerList, setPartnerList] = useState([])

    useEffect(() => {
        const fetchPartners = () => {
            sendJsonMessage({
                userId: 'user2',
                type: 'friendList'
            });
        }
        fetchPartners();
    }, []);

    useEffect(() => {
        if(lastJsonMessage == null){
            return;
        }

        const initializePartnerList = () => {
            const test = lastJsonMessage.friends[0]
            test.photoURL = ""
            test.lastMessage = ""
            setPartnerList(lastJsonMessage.friends)
            createNewPartner()
        }

        if (lastJsonMessage.type === 'friendList'){
            initializePartnerList()
        }

    }, [lastJsonMessage]);

    const getPartnerData = (Id, list = partnerList) => {
        return list.find(partner => partner.userId === Id)
    }

    const createNewPartner = (messageData) => {
        const newPartner = {
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: 'Bobilev',
            userId: 'user31',
            lastMessage: 'lmao',
            isActive: false
            //photoURL : messageData.photoURL,
            //name: messageData.name,
            //userId: messageData.senderId,
            //lastMessage: messageData.text,
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
            chatPartner,
            partnerList,
            setChatPartner,
            setPartnerList
        }
    }
}

export default usePartnerManager