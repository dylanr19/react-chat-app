import React from "react";

function TopNavigationBar() {

    return(
        <>
            <div className="top-navigation-container">
                <div className="topnav">
                    <a className="active" href="#home">Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
            </div>
        </>
    )
}

export default TopNavigationBar;