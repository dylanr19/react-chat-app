import popSound from '/src/assets/mixkit-message-pop-alert-2354.mp3';
import messageSound from '/src/assets/out-of-nowhere-message-tone.mp3';

export const playPopAudio = () => {
    const popAudio = new Audio(popSound)
    popAudio.volume = 0.5
    popAudio.play()
}

export const playMessageAudio = () => {
    const notification = new Audio(messageSound)
    notification.volume = 0.7
    notification.play()
}