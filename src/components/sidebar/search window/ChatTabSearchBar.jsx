import React from 'react'

const ChatTabSearchBar = ({ placeholder, onChange } ) => {

    return(
        <>
            <div className="partner-search-container">
                <div className="partner-search-bar">
                    <input type="text" placeholder={placeholder} name="search" onChange={onChange}/>
                </div>
            </div>
        </>
    )
}

export default ChatTabSearchBar