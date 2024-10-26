export const formatDate = (date, setLocalisedDate) => {
    if (date == null){
        // Chat Message just got sent by local user and doesn't include a date
        setLocalisedDate(new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }))

    }  else {
        // Chat Message fetched/received from backend and already includes the date
        const messageSentDate = date.endsWith('Z')
            ? new Date(date) // message was forwarded while this client is online
            : new Date(date + 'Z') // message fetched from db, where dates are saved without timezone
        const today = new Date()

        if (today.getDay() === messageSentDate.getDay() &&
            today.getMonth() === messageSentDate.getMonth() &&
            today.getFullYear() === messageSentDate.getFullYear()) {
            // Chat Message was sent today, only display the time
            setLocalisedDate(messageSentDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }))
        } else {
            // Chat Message was sent on another date
            setLocalisedDate(messageSentDate.toLocaleString([], {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }))
        }
    }
}