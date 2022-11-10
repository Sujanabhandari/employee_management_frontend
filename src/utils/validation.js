/**
 * Return error details
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 * 
 * @param {Object} formData : {email: 'test', password: '1234'} 
 * @returns Object with error details
 */
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validateForm = (formData) => {
    const errors = {
        email: !validateEmail(formData.get('email')),
    };
    return errors;
}
