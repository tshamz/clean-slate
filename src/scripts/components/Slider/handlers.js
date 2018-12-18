import 'slick-carousel';

import dom from 'common/Dom';

import settings from './settings';


export const initSliders = () => {
  $(dom.slider).each((i, slider) => {
    const sliderName = slider.dataset.slider || undefined;
    const slickSettings = settings[sliderName] || settings.default;
    $(slider).slick(slickSettings);
  });
};
