import './App.css'
import PartnerTab from './PartnerTab.jsx'
import {useEffect, useState} from "react";

const placeholder = 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg'
const placeholder2 = 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg'
const placeholder3 = 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg'

function Sidebar() {
    const [partners, setPartners] = useState([
        {
            photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: 'Jacob',
            userId: 'user1',
            lastMessage: 'I am not sure if we can work that out.',
            color: 'white',
        },
        {
            photoURL : 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg',
            name: 'Nadine',
            userId: 'user2',
            lastMessage: 'That sounds greater than ever.',
            color: 'white',
        },
        {
            photoURL : 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg',
            name: 'Bobert',
            userId: 'user3',
            lastMessage: 'Okay',
            color: 'white',
        },
    ])

    return (
        <>
            <div className="side-bar">
                {partners.map((contact) => (
                    <PartnerTab
                        photo={contact.photoURL}
                        name={contact.name}
                        Id={contact.userId}
                        key={contact.userId}
                        lastMessage={contact.lastMessage}
                        color={contact.color}
                        partners={partners}
                        setPartners={setPartners}
                    ></PartnerTab>)
                )}
            </div>
        </>
    )
}

export default Sidebar
