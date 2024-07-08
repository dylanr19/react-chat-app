import './App.css'

function ChatBox({ photo, text, date, isPartner }) {


    return (
        <>
            <div className="chat-box-partner">
                <div className="photo-container">
                    <img className="photo"
                         src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"/>
                </div>
                <div className="message-container">
                    <span className="text">Hi Bob, How are you?Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, beatae earum nemo obcaecati ratione repellendus vel. Aliquam doloribus fuga natus pariatur veritatis! Consequuntur, dicta fuga maiores molestias nesciunt quia sed.</span>
                    <span className="date">11:02 AM, January, 23rd</span>
                </div>
            </div>

            <div className="chat-box-self">
                <div className="message-container">
                    <span className="text">Hey Jake, Doing good!</span>
                    <span className="date">11:03 AM, January, 23rd</span>
                </div>
            </div>

            <div className="chat-box-partner">
                <div className="photo-container">
                    <img className="photo"
                         src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg"/>
                </div>
                <div className="message-container">
                    <span className="text">Great! Did you read my document?</span>
                    <span className="date">11:02 AM, January, 23rd</span>
                </div>
            </div>

            <div className="chat-box-self">
                <div className="message-container">
                    <span className="text">Yes I did. You passed the test!</span>
                    <span className="date">11:03 AM, January, 23rd</span>
                </div>
            </div>

        </>
    )
}

export default ChatBox
