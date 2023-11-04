/**
 * Convert a ISO date string to a human readable date string
 * @param {string} isoDate - ISO date string
 */
export const formatIsoDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}
