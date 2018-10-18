import 'slick';

import dom from 'core/Dom';
import bva from 'core/Constants';

import { get, unique } from 'core/Helpers';

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
    return unique(sliderNames).reduce((sliderNodes, sliderName) =>
      [ ...sliderNodes, ...$(`[data-slider-container="${sliderName}"]`).get() ], []);
  }
};

export const registerSliderContainer = node => {
  const productContainer = $(node).closest(dom.productContainer)[0];
  const name = node.dataset.sliderContainer;
  const $slider = $(node).slick(sliderOptions[name] || sliderOptions.default);
  const initialState = { name, productContainer, $slider };
  const sliderContainer = sliderContainers
    .set(node, initialState)
    .get(node);

  if (productContainer) {
    const sliders = get(productContainer, 'nodes', 'sliders');
    sliders.set(node, initialState)
  }

  return Promise.resolve(sliderContainer);
};

// export const registerSliderContainers = (sliders = '*', ...rest) => {
export const registerSliderContainers = () => {
  // getSliderNodes(sliders, rest)
  const nodes = $(dom.sliderContainer).get();
  const containers = nodes.map(node => registerSliderContainer(node));
  return Promise.all(containers);
};
