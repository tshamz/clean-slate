import dom from 'common/Dom';

const state = {};
window._s = state

const getContainerData = () => {
  return $(dom.productContainer).get().reduce((products, product) => {
    const id = product.dataset.productContainerId;
    const { data: options } = JSON.parse($(product).find(dom.optionData).text());
    const { data: variants } = JSON.parse($(product).find(dom.variantData).text());
    return { ...products, [id]: { options, variants }};
  }, {});
};

const getState = containerId => {
  return (containerId) ? state.containers[containerId] : state.containers;
};

export const setState = data => {
  if (data) {
    const { containerId, newState } = data;
    const oldState = state.containers[containerId];
    state.containers[containerId] = { ...oldState, ...newState };
  } else {
    state.data = getContainerData();
    state.containers = Object.entries(state.data).reduce((state, [containerId, { options, variants }]) => {
      const initialVariant = variants.find(variant => variant.isInitialVariant);
      const initialOptionValues = options.reduce((optionValues, option) =>
        ({ ...optionValues, [option.name]: option.initialValue }), {});
      const id = initialVariant.variant.id;
      const inventory = initialVariant.inventory;
      const stateObject = { id, inventory, ...initialOptionValues };
      return { ...state, [containerId]: stateObject };
    }, {});
  }

  return state;
};

export default {
  getState,
  setState,
};
