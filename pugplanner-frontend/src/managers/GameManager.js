const apiUrl = "https://localhost:7066"

export const fetchGames = async () => {
    const response = await fetch(`${apiUrl}/api/game/get`);
    const games = await response.json();
    return games;
}
