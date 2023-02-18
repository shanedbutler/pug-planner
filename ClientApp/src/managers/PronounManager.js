const apiUrl = 'https://localhost:7066';

/**
 * Get all pronouns from API
 * @returns An array of pronouns
 */
export const fetchPronouns = async () => {
   const response = await fetch(`${apiUrl}/api/pronoun/get`);
   const games = await response.json();
   return games;
};
