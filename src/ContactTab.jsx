import './App.css'

function ContactTab({ photo, name, lastMessage }) {

    return (
        <>
            <div className="contact-tab">
                <img className="photo" src={photo} alt={"photo of " + {name}} />
                <div className="info-container">
                    <text className="name">{name}</text>
                    <text className="last-message">{lastMessage}</text>
                </div>
            </div>
        </>
    )
}

export default ContactTab
