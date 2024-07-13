import '../../styles/App.css'
import PartnerTab from './PartnerTab.jsx'
import {useEffect, useState, useContext} from "react";
import {ChatContext} from '../../chat context/ChatContext.jsx'

const placeholder = 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg'
const placeholder2 = 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg'
const placeholder3 = 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg'

function Sidebar() {
    const { partnerList, setPartnerList, setChatPartner, newMessage } = useContext(ChatContext)

    return (
        <>
            <div className="side-bar">
                {
                    partnerList.map((partner) => (
                    <PartnerTab
                        partnerData={partner}
                        partnerList={partnerList}
                        setPartnerList={setPartnerList}
                        setChatPartner={setChatPartner}
                        newMessage={newMessage}
                        key={partner.userId}
                    />))
                }
            </div>
        </>
    )
}

export default Sidebar
