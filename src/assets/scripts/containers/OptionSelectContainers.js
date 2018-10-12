import dom from 'core/Dom';
import BVA from 'core/Constants';

export const optionGroupContainers = new Map();

const getCurrentOptionGroup = container => {
  return $(container).find(dom.optionGroupValue).val();
};

export const getOptionGroupContainer = node =>
  optionGroupContainers.get(node);

export const updateOptionGroupContainer = (node, newData) => {
  const oldData = optionGroupContainers.get(node) || {};
  optionGroupContainers.set(node, { ...oldData, ...newData });
  return Promise.resolve(node);
};

export const registerOptionGroupContainer = (node, data = {}) => {
  return new Promise(resolve => {
    if (!optionGroupContainers.has(node)) {
      optionGroupContainers.set(node, {
        name:
      })
    }
    resolve(optionGroupContainers);
  });

  return Promise.resolve(
    ()
    ? optionGroupContainers
    :
  );

  return new Promise(resolve => {
    if (!productContainers.has(node)) {
      productContainers.set(node, new Map([
        ['handle', node.dataset.productContainer],
        ['sliders', new Map()],
        ['quantitySelects', new Map()],
        ['optionSelects', new Map()],
        ['addToCart', new Map()],
      ]));
    }
    return Promise.resolve(productContainers);

    const options = sliderOptions[node.dataset.slider] || sliderOptions.default;
    $(node).on('init', slickInit(node, resolve));
    $(node).slick(options);
  });
};

export const initOptionGroupContainers = () => {
  const nodes = $(dom.optionGroupContainer).get();
  const promises = nodes.map(node => registerOptionGroupContainer(node));
  await Promise.all(promises);
  return optionGroupContainers;
};
