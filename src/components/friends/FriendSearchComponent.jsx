import React from "react"

const FriendSearchComponent = ({ placeholder, onChange }) => {

    return(
        <>
            <div className="example">
                <input type="text" placeholder={placeholder} name="search" onChange={onChange} />
                <button type="submit"><i className="bi bi-search"></i></button>
            </div>
        </>
    )
}

export default FriendSearchComponent