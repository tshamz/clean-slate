const defaultSettings = {
  rows: 0,
};

const sliderNav = {
  focusOnSelect: true,
  vertical: true,
  // slidesToShow: 0,
};

const productImageGallerySettings = {
  ...defaultSettings,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default {
  default: defaultSettings,
  ['product-gallery']: productImageGallerySettings,
  ['product-gallery-nav']: sliderNav,
};
