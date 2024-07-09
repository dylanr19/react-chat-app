import './App.css'
import ContactTab from './ContactTab.jsx'

function Sidebar() {
    const placeholder = 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg'

    return (
        <>
            <div className="side-bar">
                <ContactTab photo={placeholder} name={"Jacob"} lastMessage={"Great! Did you read..."}></ContactTab>
            </div>
        </>
    )
}

export default Sidebar
