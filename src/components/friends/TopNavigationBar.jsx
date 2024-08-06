import React from "react";

function TopNavigationBar() {

    return(
        <>
            <div className="top-navigation-container">
                <div className="bi bi-person-raised-hand"></div>
                <h3 className="title">Friends</h3>
                <div className="line"></div>
                <div className="topnav">
                    <a className="active" href="#news">Accepted</a>
                    <a href="#contact">Pending</a>
                    <a className="add" href="#about">Add Friends</a>
                </div>
            </div>
        </>
    )
}

export default TopNavigationBar;