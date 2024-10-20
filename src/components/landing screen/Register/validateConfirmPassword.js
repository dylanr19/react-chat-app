export const validateConfirmPassword = (isEmpty, confirmPassword, password, setIsConfirmPasswordValid, setConfirmPasswordValidationMessage) => {

    if (isEmpty(confirmPassword)){
        setIsConfirmPasswordValid(false)
        setConfirmPasswordValidationMessage('')

    } else {
        if (password === confirmPassword){
            setIsConfirmPasswordValid(true)

        } else {
            setIsConfirmPasswordValid(false)
            setConfirmPasswordValidationMessage('This password must match the password above')
        }
    }

}