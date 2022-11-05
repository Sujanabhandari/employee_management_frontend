const validateForm = (username, password, email, role) => {
    let isValid = true;
    //if not all fields are filled in return an alert
    if (!email || !password || !role) {
        alert("Please fill all the fields");
        isValid = false;
    }
    return isValid;
};

//loops over user object and fill formData object for multipart/form-data
const handleFormData = (data) => {
    const formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }

    return formData;
};
export { validateForm, handleFormData };
