import bva from 'core/Constants';

import { updateSelectedVariant } from 'handlers/ProductContainerHandlers';

import {
  updateSelectedOption,
  updateOptionGroupUI, } from 'handlers/OptionGroupHandlers';

PubSub.subscribe(bva.optionValueChange, (message, data) => {
  return updateSelectedOption(data)
    .then(updateOptionGroupUI)
    .then(updateSelectedVariant)
    // update slider to specific slide
    .catch(err => console.log(err))
});
