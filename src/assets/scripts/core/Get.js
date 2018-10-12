import { get as jsCookieGet } from 'js-cookie';

import { getSlider as sliderGet } from 'containers/SliderContainers';

const httpCache = {};

const cacheData = (type, url) => data => {
  const { [type]: typeCache } = httpCache;
  const newData = { [url]: data };
  httpCache[type] = (!typeCache) ? [newData] : [...typeCache, newData];
  return data;
};

const throwError = (type, handle) => {
  throw new Error(`unable to get() with type: \`${type}\` and handle \`${handle}\``);
};

const fetchShopifyResource = type => handle => {
  const url = `/${type}s/${handle}.json`;
  const options = { credentials: 'include' };
  const { [type]: cachedData } = httpCache;
  return (cachedData)
    ? cachedData
    : fetch(url, options)
      .then(res => res.json())
      .then(cacheData(type, url))
      .catch(err => throwError(type, handle));
};

const getCookie = async handle => {
  const cookie = jsCookieGet(handle);
  return (cookie) ? cookie : throwError('cookie', handle);
};

const getSlider = async handle => {
  const slider = await sliderGet(handle);
  return (slider.length) ? slider : throwError('slider', handle);
};

const tryAllTypes = async (handle, attempt = 0) => {
  try {
    return await Object.values(functions)[attempt](handle);
  } catch (error) {
    const nextAttemptNumber = attempt + 1;
    const totalTypes = Object.values(functions).length;
    return (nextAttemptNumber < totalTypes)
      ? tryAllTypes(handle, nextAttemptNumber)
      : null;
  }
};

const functions = {
  product: fetchShopifyResource('product'),
  collection: fetchShopifyResource('collection'),
  cookie: getCookie,
  slider: getSlider,
};

export const get = (handle, type) => {
  return new Promise(resolve => {
    resolve((type) ? functions[type](handle) : tryAllTypes(handle))
  });
};
