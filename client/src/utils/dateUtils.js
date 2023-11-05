/**
 * Convert a ISO date string to a human readable date string
 * @param {string} isoDate - ISO date string
 * @returns string
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

/**
 * Check if a ISO date string is in the past
 * @param {string} isoDate - ISO date string
 * @returns boolean
 */
export const isPastDate = (isoDate) => {
    const date = new Date(isoDate);
    const currentDate = new Date();
    return date < currentDate;
};
