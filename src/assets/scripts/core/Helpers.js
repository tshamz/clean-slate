import bva from 'core/Constants';

import { getProductContainer } from 'containers/ProductContainers';

export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const unique = array => {
  return [ ...new Set(array) ];
};

export const set = (node, properties = [], value) => {
  const setProperty = properties.pop();
  const container = get(node, properties);
  switch (true) {
    case container instanceof Map:
      return container.set(setProperty, value);
    case container instanceof Array:
      // return container[setProperty] = value;
    case container instanceof Object:
      return container[setProperty] = value;
  
    default:
      
      break;
    }
};

export const get = (node, properties = [], options) => {
  return properties.reduce((current, next, index, self) => {
    let returnedValue;

    switch (true) {
      case current instanceof Map:
        returnedValue = (current.has(next)) ? current.get(next) : current;
        break;
      case current instanceof Array:
        returnedValue = current.map(item => {
          if (item instanceof Map) {
            returnedValue = item.get(next);  // possibly returnedValue = current instead
          } else if (item instanceof Object) {
            returnedValue = item[next];
          } else {
            returnedValue = item;
          }
        });
        break;
      case current instanceof Object:
        if (current[next]) {
          returnedValue = current[next];
        } else {
          returnedValue = current;
        }
        break;
      default:
        returnedValue = current;
        break;
    }

    if (index === self.length - 1 && options) {
      if (returnedValue instanceof Map) {
        if (options.keys) {
          returnedValue = Array.from(returnedValue.keys());
        } else if (options.values) {
          returnedValue = Array.from(returnedValue.values());
        } else if (options.entries) {
          returnedValue = Array.from(returnedValue);
        }
      } else if (!returnedValue instanceof Array && returnedValue instanceof Object) {
        if (options.keys) {
          returnedValue = Object.keys(returnedValue);
        } else if (options.values) {
          returnedValue = Object.values(returnedValue);
        } else if (options.entries) {
          returnedValue = Object.entries(returnedValue);
        }
      }
    }

    return returnedValue;

  }, getProductContainer(node));
};
