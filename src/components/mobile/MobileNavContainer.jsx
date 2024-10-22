import {useEffect, useState} from "react";

export const MobileNavContainer = ( { isChatVisible } ) => {
    const [isMobile, setIsMobile] = useState(false);

    const elements = {
        friend: document.querySelector('.friend-container'),
        chatWindow: document.querySelector('.chatWindow-container'),
        sidebar: document.querySelector('.sidebar-container'),
        accountPanel: document.querySelector('.account-panel'),
    };

    const setDisplay = (elements, displayValue) => {
        for (let key in elements) {

            if (elements[key]) {

                if (displayValue[key]) {
                    elements[key].style.display = displayValue[key];
                } else {
                    elements[key].style.display = 'none';
                }
            }
        }
    }

    const displayMobileAccountPanel = () => {
        setDisplay(elements, {
            friend: 'none',
            chatWindow: 'none',
            sidebar: 'none',
            accountPanel: 'flex',
        })
    }

    const displayMobileChat = () => {
        setDisplay(elements, {
            friend: 'none',
            chatWindow: 'flex',
            sidebar: 'none',
            accountPanel: 'none',
        })
    }

    const displayMobileFriends = () => {
        setDisplay(elements, {
            friend: 'flex',
            chatWindow: 'none',
            sidebar: 'none',
            accountPanel: 'none',
        })
    }

    const displayMobileSidebar = () => {
        setDisplay(elements, {
            friend: 'none',
            chatWindow: 'none',
            sidebar: 'flex',
            accountPanel: 'none',
        })
    }

    const displayMobileFriendsOrChat = () => {
        isChatVisible ? displayMobileChat() : displayMobileFriends()
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (isMobile) {
            isChatVisible ? displayMobileChat() : displayMobileFriends()
        }
    }, [isChatVisible])

    useEffect(() => {
        if (isMobile === true) {

            if (isChatVisible){
                setDisplay(elements, {
                    friend: 'none',
                    chatWindow: 'flex',
                    sidebar: 'none',
                    accountPanel: 'none',
                })
            }
            else {
                setDisplay(elements, {
                    friend: 'flex',
                    chatWindow: 'none',
                    sidebar: 'none',
                    accountPanel: 'none',
                })
            }

        }
        else if (isMobile === false) {

            if (isChatVisible){
                setDisplay(elements, {
                    friend: 'none',
                    chatWindow: 'flex',
                    sidebar: 'flex',
                    accountPanel: 'flex',
                })
            }
            else {
                setDisplay(elements, {
                    friend: 'flex',
                    chatWindow: 'none',
                    sidebar: 'flex',
                    accountPanel: 'flex',
                })
            }

        }
    }, [isMobile]);

    return (
        <>
            <div className="mobile-top-nav">
                <button className="open-sidebar-button" onClick={displayMobileSidebar}>menu</button>
                <button className="open-friends-button" onClick={displayMobileFriendsOrChat}>friends</button>
                <button className="open-account-panel-button" onClick={displayMobileAccountPanel}>account</button>
            </div>
        </>
    )
}