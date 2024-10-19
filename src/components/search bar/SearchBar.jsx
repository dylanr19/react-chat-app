import React, {useEffect, useState} from "react";

function SearchBar({ ListStates, placeholder, SearchComponent } ) {
    const [ input, setInput ] = useState('');

    useEffect(() => {
        if (input.length === 0){
            ListStates.forEach(fr => {fr.setCurrentList(fr.originalList)})
            return
        }

        const filterUser = (user, input) => {
            const containsName = user.name.toLowerCase().includes(input.toLowerCase());
            const containsId = user.userId.toLowerCase().includes(input.toLowerCase());
            return containsName || containsId;
        }

        ListStates.forEach(fr =>
         fr.setCurrentList(
                fr.originalList.filter((item) => filterUser(item, input))
         ))

    }, [input, ...ListStates.map(({ originalList }) => originalList)]);

    return(
        <SearchComponent placeholder={placeholder} onChange={(e) => setInput(e.target.value)}></SearchComponent>
    )
}

export default SearchBar;