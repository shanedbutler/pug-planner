/**
 * POST options for fetch
 * @param {UserProfile} body 
 * @returns POST options with body
 */
export const postOption = (body) => {
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    return post
  };
