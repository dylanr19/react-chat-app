import {createContext, useEffect, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const messageData = {photoURL: '', senderId: '', date: '', text: '',}
    const [newMessage, setNewMessage] = useState(messageData)
    const [messageList, setMessageList] = useState([messageData])

    const [chatPartner, setChatPartner] = useState({photoURL : '', name: '', userId: '', lastMessage: '', isActive: false})
    const [partnerList, setPartnerList] = useState([
        {
            photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: 'Jacob',
            userId: 'user1',
            lastMessage: 'I am not sure if we can work that out.',
            isActive: false
        },
        {
            photoURL : 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg',
            name: 'Nadine',
            userId: 'user2',
            lastMessage: 'That sounds greater than ever.',
            isActive: false
        },
        {
            photoURL : 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg',
            name: 'Bobert',
            userId: 'user3',
            lastMessage: 'Okay',
            isActive: false
        },
    ])

    useEffect(() => {
        // Request message list of conversation between this user and its partner from server
        // Set the state with these messages
        setMessageList(requestMessageHistory('xxx', 'user1'))
    }, [chatPartner]);

    const requestMessageHistory = (ownId, partnerId) => {
        return [{
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            senderId: 'user1',
            date: '11:02 AM, January, 23rd',
            text: 'I am not sure if that can work out.',
        }]
    }

    const processMessage = (messageData) => {
        const partnerListCopy = [...partnerList]
        const partnerData = getPartnerData(messageData.senderId)
        const isSenderNew = partnerData == null
        const isSenderChatPartner = chatPartner.userId === messageData.senderId
        const isAppMinimized = true;

        if (isSenderNew) {
            // the sender is not a partner yet
            createNewPartner(messageData, partnerListCopy)

        } else {
            // the sender is already a partner
            setPartnerLastMessage(messageData, partnerData, partnerListCopy)

            if (isSenderChatPartner) {
                // client currently has an open chat window with the sender
                appendMessageToChat(messageData)
            }
        }

        if (isAppMinimized) {
            // app is minimized to system tray
            playNotificationSound()
            showDesktopNotification()
        }
    }

    const getPartnerData = (Id, partnerListCopy) => {
        return partnerListCopy.find(partner => partner.userId === Id)
    }

    const createNewPartner = (messageData, partnerListCopy) => {
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

    const setPartnerLastMessage = (messageData, partnerData, partnerListCopy) => {
        partnerData.lastMessage = messageData.text
        setPartnerList(partnerListCopy)
    }

    const appendMessageToChat = (messageData) => {
        const messageListCopy = [...messageList]
        messageListCopy.push(messageData)
        setMessageList(messageListCopy)
    }

    const playNotificationSound = () => {

    }

    const showDesktopNotification = () => {

    }

    return (
        <MessageContext.Provider value={{
            newMessage,
            setNewMessage,
            messageList,
            setMessageList,
            chatPartner,
            setChatPartner,
            partnerList,
            setPartnerList
        }}>
            {children}
        </MessageContext.Provider>
    );
};
