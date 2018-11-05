import 'slick';

import dom from 'core/Dom';

import { set, getContainer } from 'core/Helpers';

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

export const registerSliderContainer = node => {
  const productContainer = $(node).closest(dom.productContainer)[0];
  const name = node.dataset.sliderContainer;
  const $slider = $(node).slick(sliderOptions[name] || sliderOptions.default);

  const initialState = {
    name,
    productContainer,
    $slider
  };

  const sliderContainer = sliderContainers
    .set(node, initialState)
    .get(node);

  if (productContainer) {
    set(node, ['nodes', 'sliders', node], initialState);
  }

  return Promise.resolve(sliderContainer);
};


//

import {
  sliderContainers,
  registerSliderContainer, } from 'containers/SliderContainers';

export const initializeSliderContainers = () => {
  const nodes = $(dom.sliderContainer).get().filter(node => !sliderContainers.has(node));

  return Promise.all(nodes.map(registerSliderContainer));
};
