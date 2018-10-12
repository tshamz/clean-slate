import 'slick';

import dom from 'core/Dom';
import { uniqueValues } from 'core/Helpers';
import { productContainers, getProductContainer, updateProductContainer } from 'containers/ProductContainers';

const sliders = new Map();

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

export const getSlider = productContainer => sliders.get(productContainer);

const getSliderNodes = (sliders, rest) => {
  if (sliders === '*') {
    return $(dom.slider).get();
  } else {
    const sliderNames = (Array.isArray(sliders)) ? sliders : [ sliders, ...rest ];
    return uniqueValues(sliderNames).reduce((sliderNodes, sliderName) =>
      [ ...sliderNodes, ...$(`[data-slider="${sliderName}"]`).get() ], []);
  }
};

const slickInit = (a, node, resolve) => (event, slick) => {
  console.log(a);
  const productContainer = $(node).closest('[data-product-container]')[0];
  if (productContainer) {
    updateProductContainer(a, productContainer, ['sliders', [node, slick]]);
  }
  sliders.set(node, slick);
  resolve(node);
};

const registerSlider = (a, node, data = {}) => {
  console.log(a);
  return new Promise(resolve => {
    const options = sliderOptions[node.dataset.slider] || sliderOptions.default;
    $(node).on('init', slickInit(a, node, resolve));
    $(node).slick(options);
  });
};

// export const initSliders = (a, sliders = '*') => {
export const initSliders = (a) => {
  console.log(a);
  return Promise.all(
    $(dom.slider).get().map(node => registerSlider(a, node))
    // getSliderNodes(sliders, rest).map(node => registerSlider(a, node))
  );
};
