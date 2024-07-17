import { useState } from 'react';

function usePartnerManager () {
    const [chatPartner, setChatPartner] = useState(null)
    const [partnerList, setPartnerList] = useState([])

    const getPartnerData = (Id, list = partnerList) => {
        return list.find(partner => partner.userId === Id)
    }

    const createNewPartner = (messageData) => {
        const newPartner = {
            photoURL : messageData.photoURL,
            name: messageData.name,
            userId: messageData.senderId,
            lastMessage: messageData.text,
            isActive: false
        }

        setPartnerList((prev) => prev.concat(newPartner))
    }

    const setPartnerLastMessage = (messageData, partnerData) => {
        const partnerListCopy = [...partnerList]
        const partner = getPartnerData(partnerData, partnerData.senderId)
        partner.lastMessage = partnerData.text
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