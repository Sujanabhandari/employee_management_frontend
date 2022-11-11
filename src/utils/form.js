export const getFormData = (formData, fields) => {
    const data = {};
    fields.forEach(field => {
        data[field] = formData.get(field);
    });
    return data;
};
