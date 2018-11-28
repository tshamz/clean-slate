// import dom from 'core/Dom';
// import bva from 'core/Constants';

// import { productContainers } from 'containers/ProductContainers';
// import { lineItemContainers } from 'containers/LineItemContainers';
// import { sliderContainers } from 'containers/SliderContainers';


// export const $ = document.querySelector.bind(document)
// export const $$ = Array.from(document.querySelectorAll.bind(document));
// export const $$ = document.querySelectorAll.bind(document);

export const $$ = selector => {
  const nodes = document.querySelectorAll(selector);
  return Array.from(nodes);
};

PubSub.subscribe('BVA', (message, data) => console.log(message, data));

export const makeActionCreator = (type, ...argNames) => {
  return (...args) => {
    return argNames.reduce(
      (action, arg, index) => {
        return { ...action, [arg]: args[index] };
      },
      { type }
    );
  };
};

export const getAlternativeTemplate = async (resource, templateName, json = false) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return await fetch(url, options).then(res => (json) ? res.json() : res.text());
};

export const unique = array => {
  return [ ...new Set(array) ];
};

export const getContainer = (node, includeSliders = false) => {
  const productContainerNode = $(node).closest(dom.productContainer)[0];
  const lineItemContainerNode = $(node).closest(dom.lineItemContainer)[0];
  const sliderContainerNode = $(node).closest(dom.sliderContainer)[0];

  if (productContainerNode) {
    return productContainers.get(productContainerNode)
  } else if (lineItemContainerNode) {
    return lineItemContainers.get(lineItemContainerNode)
  } else if (sliderContainerNode && includeSliders) {
    return sliderContainers.get(sliderContainerNode)
  }
};

export const get = (node, properties, options) => {
  if (!properties) {
    return getContainer(node);
  }

  const propertiesArray = (typeof properties === 'string') ? properties.split('.') : properties;

  return propertiesArray.reduce((current, next, index, self) => {
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

  }, getContainer(node));
};


export const set = (node, properties, value) => {
  if (!properties) {
    return;
  }

  const propertiesArray = (typeof properties === 'string') ? properties.split('.') : properties;
  const key = propertiesArray.pop();
  const target = get(node, propertiesArray);

  switch (true) {
    case target instanceof Map:
      target.set(key, value);
      break;
    case target instanceof Object:
      target[key] = value;
      break;
  }

  return Promise.resolve({ node, value });
};
