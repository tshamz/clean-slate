export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const uniqueValues = array => {
  return [ ...new Set(array)];
};
