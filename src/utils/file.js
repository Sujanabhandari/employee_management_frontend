import { toast } from "react-toastify";

export const csvFileToArray = (text, csvHeaderMap, requiredFields) => {
    const delimiter = new RegExp(/;|,/gis);
    const csvOriginalHeaders = text.slice(0, text.indexOf("\n")).split(delimiter);
    // Replace \r and whitespaces with ''
    const csvHeaders = csvOriginalHeaders.map(
        h => h.replace(/[\n\r]+/g, '').trim().toLowerCase()
    );

    // Validate that given headers have correct mapping headers
    const headerErrors = csvOriginalHeaders.filter(
        (h, index) => !(csvHeaders[index] in csvHeaderMap)
    );
    if (headerErrors.length > 0) {
        toast.error(`Invalid column headers: ${headerErrors.join(', ')}`);
        toast.info(`Valid column headers: ${Object.keys(csvHeaderMap).join(', ')}`, {
            autoClose: false,
        });
        return {error: true};
    }
    const csvRows = text.slice(text.indexOf("\n") + 1).split("\n");
    let data = [];
    let error = false;
    csvRows.forEach(row => {
        // Remove \r and whitespace
        const trimmedRow = row.replace(/[\n\r]+/g, '').trim();
        if (trimmedRow === '')
            return;
        const values = trimmedRow.split(delimiter);
        const obj = csvHeaders.reduce((object, header, index) => {
            const fieldName = csvHeaderMap[header];
            if (requiredFields.includes(fieldName) && !values[index]) {
                toast.warn(`Value for ${fieldName} column is required.`);
                error = true;
            }
            object[fieldName] = values[index].trim();
            return object;
        }, {});
        data.push({...obj});
    });
    return {data: data, error: error};
}
