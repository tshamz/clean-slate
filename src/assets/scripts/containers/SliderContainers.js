import 'slick';

import dom from 'core/Dom';
import bva from 'core/Constants';
import { uniqueValues, registerContainer } from 'core/Helpers';

export const sliderContainers = new Map();
window.s = sliderContainers;

const defaultSliderOptions = {
  autoplay: true,
  arrows: false,
  autoplaySpeed: 5000,
  rows: 0,  // needed to fix https://github.com/kenwheeler/slick/issues/3110
};

const productGalleryOptions = {
  ...defaultSliderOptions,
};

const sliderOptions = {
  'default': defaultSliderOptions,
  'product-gallery': productGalleryOptions,
};

const getSliderNodes = (sliders, rest) => {
  if (sliders === '*') {
    return $(dom.sliderContainer).get();
  } else {
    const sliderNames = (Array.isArray(sliders)) ? sliders : [ sliders, ...rest ];
    return uniqueValues(sliderNames).reduce((sliderNodes, sliderName) =>
      [ ...sliderNodes, ...$(`[data-slider-container="${sliderName}"]`).get() ], []);
  }
};

export const registerSliderContainer = node => {
  const name = node.dataset.sliderContainer;
  const initialState = {
    name,
    'productContainer': $(node).closest(dom.productContainer)[0],
    '$slider': $(node).slick(sliderOptions[name] || sliderOptions.default)
  };

  return Promise.resolve(
    registerContainer(node, bva.slider, initialState)
  );
};

export const initSliderContainers = async (sliders = '*', ...rest) => {
  return Promise.all(
    getSliderNodes(sliders, rest).map(node => registerSliderContainer(node))
  );
};
