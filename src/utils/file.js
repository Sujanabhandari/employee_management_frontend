import { toast } from "react-toastify";

export const csvFileToArray = (text, csvHeaderMap) => {
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
    const data = csvRows.map(i => {
        const values = i.split(delimiter);
        const obj = csvHeaders.reduce((object, header, index) => {
            object[csvHeaderMap[header]] = values[index];
            return object;
        }, {});
        return obj;
    });
    return {data};
}
