import '../../styles/App.css'
import PartnerTab from './PartnerTab.jsx'
import {useEffect, useState, useContext} from "react";
import {ChatContext} from '../../Contexts/ChatContext.jsx'
import { v4 as uuidv4 } from 'uuid'

const placeholder = 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg'
const placeholder2 = 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg'
const placeholder3 = 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg'

function Sidebar() {
    const { filteredChatPartners, setFilteredChatPartners, startNewChat, resetUnreadMessageCount } = useContext(ChatContext)

    return (
        <>
            <div className="side-bar">
                {
                    filteredChatPartners.map((partner) => (
                    <PartnerTab
                        partnerData={partner}
                        partnerList={filteredChatPartners}
                        setPartnerList={setFilteredChatPartners}
                        startNewChat={startNewChat}
                        resetUnreadMessageCount={resetUnreadMessageCount}
                        key={uuidv4()}
                    />))
                }
            </div>
        </>
    )
}

export default Sidebar
