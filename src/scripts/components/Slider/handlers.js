import 'slick-carousel';

import state from 'state';
import dom from 'common/Dom';
import settings from './settings';


export const slickFilter = (sliderName, filter) => {
  const $slider = $(`[data-slider="${sliderName}"]`);
  $slider.slick('slickUnfilter');
  $slider.slick('slickFilter', filter);
};

const filterSlider = (id, slider) => {
  const containerState = state.getState(id);
  const sliderName = slider.dataset.slider;
  const filterGroupOption = slider.dataset.filterGroupOption;
  const filterValue = containerState[filterGroupOption];
  const filterAttr = slider.dataset.filterAttr;
  const filter = `[${filterAttr}="${filterValue}"]`;

  const optionValues = containerState.data.options.find(option => option.name === filterGroupOption).values;

  const hasValue = $(slider)
    .find(dom.productGallerySlide)
    .get()
    .some(slide => optionValues.includes($(slide).attr(filterAttr)));

  if (hasValue) {
    slickFilter(sliderName, filter);
  }
};

export const initSliders = () => {
  $(dom.slider).each((i, slider) => {
    const sliderName = slider.dataset.slider;
    const filterGroupOption = slider.dataset.filterGroupOption;
    const hasNav = (slider.dataset.hasNav === 'true');
    const settingsBase = settings[sliderName] || settings.default;

    const sliderSettings = (hasNav)
      ? { ...settingsBase, customPaging: settings.navCustomPaging, dots: true }
      : { ...settingsBase };

    $(slider).slick(sliderSettings);

    if (filterGroupOption) {
      const id = $(slider).closest(dom.container).data('container-id');
      filterSlider(id, slider);
    }
  });
};

export const updateSlides = data => {
  const { id, ...option } = data;
  const change = Object.keys(option)[0];
  const $sliders = dom.$getContainer(id).find(dom.slider);

  $sliders.each((i, slider) => {
    const sliderName = slider.dataset.slider;
    const filterGroupOption = slider.dataset.filterGroupOption;

    if (change === filterGroupOption) {
      filterSlider(id, slider);
    }
  });
};
