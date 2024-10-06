import React from 'react'

const PartnerSearchComponent = ( { placeholder, onChange } ) => {

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

export default PartnerSearchComponent