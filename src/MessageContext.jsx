import {createContext, useEffect, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [partnerId, setPartnerId] = useState(null)
    const [partnerName, setPartnerName] = useState(null)

    const [newMessage, setNewMessage] = useState({
        senderId: '',
        date: '',
        text: '',
        photoURL: '',
    })

    const [messageList, setMessageList] = useState([{
        senderId: '',
        date: '',
        text: '',
        photoURL: '',
    }])

    useEffect(() => {
        // Request message list of conversation between this user and its partner from server
        // Set the state with these messages
        setMessageList(requestMessageList)
    }, []);

    const requestMessageList = () => {
        return [{
            senderId: 'user1',
            date: '11:02 AM, January, 23rd',
            text: 'I am not sure if that can work out.',
            photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
        }]
    }

    return (
        <MessageContext.Provider value={{
            newMessage,
            setNewMessage,
            messageList,
            setMessageList,
            partnerId,
            setPartnerId,
            partnerName,
            setPartnerName
        }}>
            {children}
        </MessageContext.Provider>
    );
};
