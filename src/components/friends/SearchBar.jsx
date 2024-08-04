import React from "react";

function SearchBar() {

    return(
        <>
            <form className="example" action="/action_page.php">
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit"><i className="bi bi-search"></i></button>
            </form>
        </>
    )
}

export default SearchBar;