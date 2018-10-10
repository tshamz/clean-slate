import 'slick';

import { uniqueValues } from 'global/Helpers';
import { updateProductContainer } from 'components/ProductContainers';

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

export const initSlider = node => {
  return new Promise(resolve => {
    const options = sliderOptions[node.dataset.slider] || sliderOptions.default;
    const slider = $(node).slick(options);
    sliders.set(node, slider);

    const productContainer = $(node).closest('[data-product-container]').get(0);

    if (productContainer) {
      updateProductContainer(productContainer, { slider })
    }

    resolve(slider);
  });
};

export const initSliders = (sliders = '*', ...rest) => {
  let sliderNodes;
  const initAllSliders = (sliders === '*');
  const initSomeSliders = (typeof sliders === 'string' || Array.isArray(sliders));

  if (initAllSliders) {
    sliderNodes = $('[data-slider]').get()
  } else if (initSomeSliders) {
    const sliderNames = (Array.isArray(sliders)) ? sliders : [ sliders, ...rest ];
    sliderNodes = uniqueValues(sliderNames).reduce((sliderNodes, sliderName) =>
      [ ...sliderNodes, ...$(`[data-slider="${sliderName}"]`).get() ], []);
  }

  const sliderPromises = sliderNodes.map(node => initSlider(node));
  return Promise.all(sliderPromises);
};
