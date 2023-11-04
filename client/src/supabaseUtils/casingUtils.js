/**
 * Coverts snake_cased property keys to camelCased keys
 * @param {*} obj Supabase response object
 * @returns object with camelCased keys
 */
export const camelCaseKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => camelCaseKeys(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [toCamelCase(key)]: camelCaseKeys(obj[key]),
        }),
        {}
      );
    }
    return obj;
  };
  
  /**
   * Coverts camelCased property keys to snake_cased keys
   * @param {*} obj
   * @returns object with snake_cased keys
   */
  export const snakeCaseKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => snakeCaseKeys(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [toSnakeCase(key)]: snakeCaseKeys(obj[key]),
        }),
        {}
      );
    }
    return obj;
  };

// Function to convert snake case to camel case
const toCamelCase = (str) => {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
}

// Function to convert camel case to snake case
const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
