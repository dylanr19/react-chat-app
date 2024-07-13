const sendMessage = (messageData) => {
    console.log('sent message: ' + messageData.text)
    console.log('waiting for server response...')

    const serverResponse = ''

    if (serverResponse === 'msg received')
        return true

    if (serverResponse === 'msg denied')
        return false

    if (serverResponse === 'msg timeout')
        return false
}

const setMessageFailed = (senderId, messageHistory, setMessageHistory) => {
    const copiedMessageHistory = [...messageHistory]
    const messageData = copiedMessageHistory.find( message => message.userId === senderId)
    messageData.delivered = false
    setMessageHistory(copiedMessageHistory)
}

const appendMessageToChat = (messageData, messageHistory, setMessageHistory) => {
    const messageListCopy = [...messageHistory]
    messageListCopy.push(messageData)
    setMessageHistory(messageListCopy)
}

export {
    sendMessage,
    setMessageFailed,
    appendMessageToChat
}