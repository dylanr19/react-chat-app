import './App.css'
import {useEffect, useRef, useState} from 'react'

//- ON OPEN PARTNER TAB
// 	- Change background color of tab to mint blue
// 	- Change background color of previous tab to white
// 	- Reset unread message icon to 0
// 	- Clear chatboxes of current conversation
// 	- Request chat messages of your conversation with this person from server
// 	- Load in the chat messages in the chat view

function ContactTab({ photo, name, userId, lastMessage, color, contacts, setContacts }) {
    const [unreadMessages, setUnreadMessages] = useState(8);

    const incrementUnreadMessages = () => {
        setUnreadMessages((prevState) => prevState++ );
    }

    const  switchPartner = () => {

        setContactInactive()
        setContactActive()
        resetUnreadMessages()
        // call function in chat window for performing chatBox related logic and make shared context for handling message api logic
    }

    const setContactInactive = () => {

        // Only inactive contact tabs have a white color
        const activeContact = contacts.find( contact => contact.color !== 'white' )
        activeContact.color = 'white'
    }

    const setContactActive = () => {

        const activeContact = contacts.find( contact => contact.color === 'white' )
        activeContact.color = '#f8f9fd'
    }

    const resetUnreadMessages = () => {

        setUnreadMessages(0)
    }

    return (
        <>
            <div className="contact-tab" style={{ background: color }} id={userId} onClick={() => switchPartner(userId)}>
                <img className="photo" src={photo} alt={"photo of " + {name}}/>
                <div className="info-container">
                    <div className="name">{name}</div>
                    <div className="last-message">{lastMessage}</div>
                </div>
                <div className="unread-icon">{unreadMessages}</div>
            </div>
        </>
    )
}

export default ContactTab
