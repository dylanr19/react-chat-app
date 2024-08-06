import React from "react";

function TopNavigationBar() {

    return(
        <>
                <div className="topnav">
                    <a className="active" href="#news">Friends</a>
                    <a href="#contact">Pending</a>
                    <a className="add" href="#about">Add Friends</a>
                </div>
        </>
    )
}

export default TopNavigationBar;