import 'slick-carousel';

import dom from 'common/Dom';

import settings from './settings';


export const initSliders = () => {
  $(dom.slider).each((i, slider) => {
    const sliderName = slider.dataset.slider;
    const sliderSettings = settings[sliderName] || settings.default;
    const sliderNavFor = slider.dataset.sliderNavFor;
    const sliderHasNav = slider.dataset.sliderHasNav;

    if (sliderNavFor) {
      $(slider).slick({ ...sliderSettings, asNavFor: `[data-slider="${sliderNavFor}"]`});
    } else if (sliderHasNav) {
      $(slider).slick({ ...sliderSettings, asNavFor: `[data-slider="${sliderHasNav}"]`});
    }
    $(slider).slick(sliderSettings);
  });
};

export const updateSlides = data => {
  console.log(data);
};
