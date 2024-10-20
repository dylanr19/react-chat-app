export const validatePassword = (password, setIsPasswordValid, isEmpty, setPasswordValidationMessage) => {
    const lowercase = /(?=.*[a-z])/;
    const uppercase = /(?=.*[A-Z])/;
    const digit = /(?=.*\d)/;
    const specialCharacter = /(?=.*[\W_])/;
    const lengthRequirement = /.{12,}/;

    setIsPasswordValid(false)

    if (isEmpty(password))
        setPasswordValidationMessage(null)

    // TODO: Gebruikers met een hashtag in hun WW kunnen niet inloggen. dus voor nu deze workaround
    else if (password.includes("#"))
        setPasswordValidationMessage('Your password can not contain a hashtag')

    else if (lowercase.test(password) === false)
        setPasswordValidationMessage('Your password must contain at least one lowercase character')

    else if (uppercase.test(password) === false)
        setPasswordValidationMessage('Your password must contain at least one uppercase character')

    else if (digit.test(password) === false)
        setPasswordValidationMessage('Your password must contain at least one digit character')

    else if (specialCharacter.test(password) === false)
        setPasswordValidationMessage('Your password must contain at least one special character')

    else if (lengthRequirement.test(password) === false)
        setPasswordValidationMessage('Your password must be at least 12 characters long')

    else {
        setPasswordValidationMessage(null)
        setIsPasswordValid(true)
    }

}