import {createContext, useEffect, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [chatPartner, setChatPartner] = useState({
        photoURL : '',
        name: '',
        userId: '',
        lastMessage: '',
        isActive: false
    })

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

    const messageData = {
        photoURL: '',
        senderId: '',
        date: '',
        text: '',
    }

    const [newMessage, setNewMessage] = useState(messageData)
    const [messageList, setMessageList] = useState([messageData])

    useEffect(() => {
        // Request message list of conversation between this user and its partner from server
        // Set the state with these messages
        setMessageList(requestMessageList)
    }, []);

    const requestMessageList = () => {
        return [{
            photoURL: '',
            senderId: 'user1',
            date: '11:02 AM, January, 23rd',
            text: 'I am not sure if that can work out.',
        }]
    }

    const processMessage = (messageData) => {
        // process incoming message:
        // Check if id of current chat partner matches that of the sender's id
        if (chatPartner.userId === messageData.senderId) {
            // client is currently chatting with the sender
            const messageListCopy = [...messageList]
            messageListCopy.push(messageData)
            setMessageList(messageListCopy)

            const partnerListCopy = [...partnerList]
            const partnerData = partnerListCopy.find(partner => partner.userId === messageData.senderId)
            partnerData.lastMessage = messageData.text
            setPartnerList(partnerListCopy)

            return
        }

        // client is not currently chatting with the sender
        const partnerListCopy = [...partnerList]
        const partnerData = partnerListCopy.find(partner => partner.userId === messageData.senderId)

        if (partnerData == null) {
            // this sender does not have a partner tab
            const newPartner = {
                photoURL : messageData.photoURL,
                name: messageData.name,
                userId: messageData.senderId,
                lastMessage: messageData.text,
                isActive: false
            }

            partnerListCopy.push(newPartner)
            setPartnerList(partnerListCopy)
        } else {
            // this sender does already have a partner tab
            partnerData.lastMessage = messageData.text
            setPartnerList(partnerListCopy)
            return
        }

        //if (app is minimized to system tray) {
            // play ping sound
            // show desktop notification
        //}
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
