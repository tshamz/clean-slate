const defaultSettings = {
  rows: 0,
};

const productImageGallerySettings = {
  ...defaultSettings,
};

export default {
  default: defaultSettings,
  ['product-image-gallery']: productImageGallerySettings,
};
