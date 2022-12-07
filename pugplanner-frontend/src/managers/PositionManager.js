const apiUrl = "https://localhost:7066"

export const fetchPositions = async () => {
    const response = await fetch(`${apiUrl}/api/position/get`);
    const positions = await response.json();
    return positions;
}
