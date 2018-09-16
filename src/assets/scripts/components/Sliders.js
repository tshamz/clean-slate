import 'slick';

const productGalleryOptions = {
  autoplay: true,
  arrows: false,
  autoplaySpeed: 5000
};

const sliders = {
  'product-gallery': {
    selector: '[data-slider="product-gallery"]',
    options: productGalleryOptions,
  },
};

export const getSlider = async sliderName => {
  const sliderData = sliders[sliderName];
  return (!sliderData.slider) ? await initSlider(sliderName) : sliderData.slider;
};

export const initSlider = sliderName => {
  return new Promise(resolve => {
    const sliderData = sliders[sliderName];
    const { selector, options } = sliderData;
    const $slider = $(selector).slick(options);
    sliderData.slider = $slider;
    resolve(sliderData.slider);
  });
};
