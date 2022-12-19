/**
 * POST options for fetch
 * @param {object} body
 * @returns POST options with appended body
 */
export const postOption = (body) => {
    const post = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return post;
};

/**
 * PUT options for fetch
 * @param {object} body
 * @returns PUT options with appended body
 */
export const putOption = (body) => {
    const put = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return put;
};
