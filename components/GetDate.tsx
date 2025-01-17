export function getDate() {
    const today = new Date();

    let minutes = today.getMinutes()
    let hours = today.getHours()
    let day = today.getDate()
    let month = today.getMonth() + 1 // index start at 0
    
    let minutesAsStr
    let dayAsStr
    let monthAsStr
    let hoursAsStr

    if (minutes < 10) {
        minutesAsStr = "0" + minutes
    } else { minutesAsStr = minutes}

    if (day < 10) {
        dayAsStr = "0" + day
    } else { dayAsStr = day}

    if (month < 10) {
        monthAsStr = "0" + month
    } else { monthAsStr = month}

    if (hours < 10) {
        hoursAsStr = "0" + hours
    } else { hoursAsStr = hours}

    const date = today.getFullYear() + '/' + monthAsStr + '/' + dayAsStr + ' ' + hoursAsStr + ':' + minutesAsStr; 
    return date   
}   