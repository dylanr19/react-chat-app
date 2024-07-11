import './App.css'
import {useEffect, useState, useContext} from 'react'
import {MessageContext} from "./MessageContext.jsx";

function PartnerTab(props) {
    const [unreadMessageCount, setUnreadMessageCount] = useState(8);
    const [truncatedMessage, setTruncatedMessage] = useState('')
    const {newMessage, setPartnerId, setPartnerName} = useContext(MessageContext);

    useEffect(() => {
        truncateMessage(props.lastMessage)
    }, [props.lastMessage]);

    useEffect(() => {
        processNewMessage()
    }, [newMessage]);

    const processNewMessage = () => {
        if (newMessage.senderId === props.Id) {
            truncateMessage(newMessage.text)
        }

        // if tab is white that means its inactive
        if (props.color === 'white'){
            incrementUnreadMessages()
        }
    }

    const truncateMessage = (message) => {
        if (message.length > 16) {
            setTruncatedMessage(message.slice(0, 16) + '...')
        } else {
            setTruncatedMessage(message)
        }
    }

    const  switchPartner = () => {
        setpartnerInactive()
        setpartnerActive()
        resetUnreadMessages()
        setPartnerId(props.Id)
        setPartnerName(props.name)
    }

    const setpartnerInactive = () => {
        // Only inactive partner tabs have a white color
        const partnersCopy = [...props.partners]
        const activePartner = partnersCopy.find( partner => partner.color !== 'white' )

        if (activePartner == null) {
            return
        }

        activePartner.color = 'white'
        props.setPartners(partnersCopy)
    }

    const setpartnerActive = () => {
        const partnersCopy = [...props.partners]
        const activePartner = partnersCopy.find( partner => partner.userId === props.Id )
        activePartner.color = '#f8f9fd'

        props.setPartners(partnersCopy)
    }

    const incrementUnreadMessages = () => {
        setUnreadMessageCount((prevState) => prevState++ );
    }

    const resetUnreadMessages = () => {
        setUnreadMessageCount(0)
    }

    return (
        <>
            <button className="partner-tab" style={{ background: props.color }} id={props.Id} onClick={() => switchPartner(props.Id)}>
                <img className="photo" src={props.photo} alt={"photo of " + props.name}/>
                <div className="info-container">
                    <div className="name">{props.name}</div>
                    <div className="last-message">{truncatedMessage}</div>
                </div>
                { unreadMessageCount === 0
                    ? <div className="placeholder" style={{width: '15px', height: '15px'}}></div>
                    : <div className="unread-icon">{unreadMessageCount}</div>
                }
            </button>
        </>
    )
}

export default PartnerTab
