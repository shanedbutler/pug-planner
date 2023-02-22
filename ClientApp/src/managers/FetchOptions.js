/**
 * GET options for fetch
 * @param {*} token
 */
export const getOption = (token) => {
   return {
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
   };
};

/**
 * POST options for fetch
 * @param {object} body
 * @param {*} token
 * @returns POST options with appended body
 */
export const postOption = (body, token) => {
   const post = {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
   };
   return post;
};

/**
 * PUT option for fetch
 * @param {object} body
 * @param {*} token
 * @returns PUT options with appended body
 */
export const putOption = (body, token) => {
   const put = {
      method: 'PUT',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
   };
   return put;
};

export const deleteOption = (body, token) => {
   return {
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
   };
};
