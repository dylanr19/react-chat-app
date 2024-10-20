export const validateName = (isEmpty, isNameValid, setIsDisplayNameValid, setDisplayNameValidationMessage, isWithinLength, displayName, hasSpecialCharacters) => {
    setIsDisplayNameValid(isNameValid(displayName))

    if (isEmpty(displayName))
        setDisplayNameValidationMessage(null)

    else if (isWithinLength(displayName, 6, 30) === false)
        setDisplayNameValidationMessage('Your display name must be between 6 and 30 characters')

    else if (hasSpecialCharacters(displayName))
        setDisplayNameValidationMessage('Your display name should not contain any special characters')

    else
        setDisplayNameValidationMessage(null)
}