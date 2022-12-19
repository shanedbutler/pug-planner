const apiUrl = 'https://localhost:7066';

/**
 * Get positions from database
 * @returns Array of positions with id and name properties
 */
export const fetchPositions = async () => {
    const response = await fetch(`${apiUrl}/api/position/get`);
    const positions = await response.json();
    return positions;
};
