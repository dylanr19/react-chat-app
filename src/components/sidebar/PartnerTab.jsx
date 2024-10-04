import '../../styles/App.css'
import {useEffect, useState} from 'react'

function PartnerTab({ partnerData, partnerList, setPartnerList, startNewChat, resetUnreadMessageCount }) {
    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        console.log(unreadMessages)
    }, [partnerData.unreadMessageCount]);

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
        resetUnreadMessageCount(partnerData.userId)
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
                    partnerData.unreadMessageCount === 0
                        ? <div className="placeholder" style={{width: '15px', height: '15px'}}></div>
                        : <div className="unread-icon-container">
                            <i className="bi bi-chat-left-dots-fill"></i>
                            <div className="unread-count">{partnerData.unreadMessageCount}</div>
                        </div>
                }
            </button>
        </>
    )
}

export default PartnerTab
