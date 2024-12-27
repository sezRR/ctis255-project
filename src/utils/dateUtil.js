/**
 * Convert date from MM/DD/YYYY to DD/MM/YYYY
 * @param {string} date - The date to be converted
 * @param {string} separator - The seperator used in the date
 */
function convertToDefaultFormat(date, separator) {
    if (!separator)
        throw new Error("Separator is required");

    const parts = date.split(separator);
    return parts[1] + separator + parts[0] + separator + parts[2];
}

export { convertToDefaultFormat };