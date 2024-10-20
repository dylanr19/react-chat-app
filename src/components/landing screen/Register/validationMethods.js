export const hasSpecialCharacters = (str) => {
    return /[^a-zA-Z0-9 ]/.test(str);
}

export const isWithinLength = (str, min, max) => {
    return str.length >= min && str.length <= max;
}

export const isEmpty = (str) => {
    return str.length === 0;
}

export const isNameValid = (name) => {
    return isEmpty(name) === false
        && hasSpecialCharacters(name) === false
        && isWithinLength(name, 6, 30)
}