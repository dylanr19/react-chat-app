import '../../styles/App.css'
import {useEffect, useState} from 'react'

function PartnerTab({ partnerData, partnerList, setPartnerList, startNewChat }) {
    const [unreadMessages, setUnreadMessages] = useState(8);

    const incrementUnreadMessages = () => {
        setUnreadMessages((prevState) => prevState++ );
    }

    const resetUnreadMessages = () => {
        setUnreadMessages(0)
    }

    const deactivatePreviousTab = (partnerList) => {
        const activePartner = partnerList.find( partner => partner.isActive === true )
        if (activePartner == null) {
            return
        }
        activePartner.isActive = false;
    }

    const activateThisTab = (partnerList) => {
        const activePartner = partnerList.find( partner => partner.userId === partnerData.userId )
        activePartner.isActive = true;
    }

    const switchActiveTab = () => {
        const copiedPartnerList = [...partnerList]
        deactivatePreviousTab(copiedPartnerList)
        activateThisTab(copiedPartnerList)
        setPartnerList(copiedPartnerList)
        startNewChat(partnerData)
    }

    const handleTabClick = () => {
        resetUnreadMessages()
        switchActiveTab()
    }

    return (
        <>
            <button className="partner-tab" style={{ background: partnerData.isActive ? '#f8f9fd' : 'white' }} id={partnerData.userId} onClick={() => handleTabClick()}>
                <img className="photo" src={partnerData.photoURL} alt={"photo of " + partnerData.name}/>
                <div className="info-container">
                    <div className="name">{partnerData.name}</div>
                </div>
                {
                    unreadMessages === 0
                    ? <div className="placeholder" style={{width: '15px', height: '15px'}}></div>
                    : <div className="unread-icon">{unreadMessages}</div>
                }
            </button>
        </>
    )
}

export default PartnerTab
