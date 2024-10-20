export const validateUsername = async (doesUsernameAlreadyExist, setIsUsernameValid, isEmpty, setUsernameValidationMessage, isWithinLength, username, hasSpecialCharacters, isNameValid) => {

    const doesUsernameExist = await doesUsernameAlreadyExist()
    setIsUsernameValid(isNameValid(username) && doesUsernameExist === false)

    if (isEmpty(username))
        setUsernameValidationMessage(null)

    else if (isWithinLength(username, 6, 30) === false)
        setUsernameValidationMessage('Your username name must be between 6 and 30 characters')

    else if (hasSpecialCharacters(username))
        setUsernameValidationMessage('Your username name should not contain any special characters')

    else if (doesUsernameExist)
        setUsernameValidationMessage('Your username already exists')

    else
        setUsernameValidationMessage(null)

}