export const playPopAudio = () => {
    const popAudio = new Audio('src/assets/mixkit-message-pop-alert-2354.mp3')
    popAudio.volume = 0.5
    popAudio.play()
}

export const playMessageAudio = () => {
    const notification = new Audio('src/assets/out-of-nowhere-message-tone.mp3')
    notification.volume = 0.7
    notification.play()
}