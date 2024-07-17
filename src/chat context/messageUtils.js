// const sendMessage = (messageData) => {
//     console.log('sent message: ' + messageData.text)
//     console.log('waiting for server response...')
//
//     const serverResponse = ''
//
//     if (serverResponse === 'msg received')
//         return true
//
//     if (serverResponse === 'msg denied')
//         return false
//
//     if (serverResponse === 'msg timeout')
//         return false
// }

const setMessageFailed = (senderId, messageHistory, setMessageHistory) => {
    const messageData = messageHistory.find( message => message.userId === senderId)
    messageData.delivered = false
    setMessageHistory((prev) => prev.concat(messageData))
}

const appendMessageToChat = (messageData, messageHistory, setMessageHistory) => {
    setMessageHistory((prev) => prev.concat(messageData))
}

export {
    //sendMessage,
    setMessageFailed,
    appendMessageToChat
}