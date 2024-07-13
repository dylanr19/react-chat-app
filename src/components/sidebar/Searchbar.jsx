//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import '../../styles/App.css'

function Searchbar() {
    //const [count, setCount] = useState(0)

    return (
        <>
            <div className="search-bar">
                <i className="bi bi-search"></i>
                <input type="text" className="input" placeholder="Search ..."/>
            </div>
        </>
    )
}

export default Searchbar
