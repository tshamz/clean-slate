export const $$ = selector => {
  const nodes = document.querySelectorAll(selector);
  return Array.from(nodes);
};

export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const unique = array => {
  return [ ...new Set(array) ];
};

export const animationEnd = (action, selector, resolve) => {
  $(selector).one('transitionend', () => {
    if (action === 'show' && $(selector).is('.is-active')) {
      resolve();
    } else if (action === 'hide' && !$(selector).is('.is-active')) {
      resolve();
    }
  });
};
