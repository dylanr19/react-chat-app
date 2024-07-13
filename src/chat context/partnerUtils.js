const getPartnerData = (Id, partnerListCopy) => {
    return partnerListCopy.find(partner => partner.userId === Id)
}

const createNewPartner = (messageData, partnerListCopy, setPartnerList) => {
    const newPartner = {
        photoURL : messageData.photoURL,
        name: messageData.name,
        userId: messageData.senderId,
        lastMessage: messageData.text,
        isActive: false
    }

    partnerListCopy.push(newPartner)
    setPartnerList(partnerListCopy)
}

const setPartnerLastMessage = (messageData, partnerData, partnerListCopy, setPartnerList) => {
    partnerData.lastMessage = messageData.text
    setPartnerList(partnerListCopy)
}

export {
    getPartnerData,
    createNewPartner,
    setPartnerLastMessage
}