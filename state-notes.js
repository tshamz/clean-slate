const prices = $('[data-price]').get()
  // .map(node => ({ node, type: node.dataset.price }));
  .map(node => [node, {id: node, type: node.dataset.price}]);
const price = new Map(prices);

const optionValues = $('[data-option-value] input').get()
  // .map(node => ({ node, id: node.id, name: node.name, value: node.value, selected: node.checked }));
  .map(node => [node, {id: node, _id: node.id, name: node.name, value: node.value, selected: node.checked}]);
const optionValue = new Map(optionValues);

const optionGroups = $('[data-option-group]').get()
  // .map(node => ({ node, }));
  .map(node => [node, {id: node, }]);
const optionGroup = new Map(optionGroups);

const quantitys = $('[data-quantity-value]').get()
  // .map(node => ({ node, quantity: parseInt(node.value) }));
  .map(node => [node, {id: node, quantity: parseInt(node.value) }]);
const quantity = new Map(quantitys);

const addToCarts = $('[data-add-to-cart]').get()
  // .map(node => ({ node, }));
  .map(node => [node, {id: node, }]);
const addToCart = new Map(addToCarts);

const sliders = $('[data-slider]').get()
  // .map(node => ({ node, }));
  .map(node => [node, {id: node, }]);
const slider = new Map(sliders);

const products = $('[data-product-container]').get()
  // .map(node => ({ node, }));
  .map(node => [node, {id: node, }]);
const product = new Map(products);
// product: {
//   price,
//   compareAtPrice,
//   options: {
//     [name]: value
//   },
//   quantity,
//   variant,
// },

const lineItems = $('[data-line-item-container]').get()
  .map(node => [node, {id: node, }]);
const lineItem = new Map(lineItems);
// lineItems: {
//   key,
//   properties,
//   quantity,
//   variant,
// },

const variants = $('[data-variant-data]').get().reduce((variants, node) =>
  [variants, ...JSON.parse(node.innerHTML).data], []);

const initialState = {
  ...window.bvaccel,
  nodes: {
    price,
    optionValue,
    optionGroup,
    quantity,
    addToCart,
    slider,
  },
  containers: {
    product,
    lineItems,
  },
  variants,
};


//


// collection: {{ collection | json }},
// product: {{ product | json }},

{
  shop: {
    template,
    currentPage,
    theme: {
      name,
      id
    },
    customer: {
      loggedIn,
      id,
      orderCount,
      email,
    }
  },
  nodes: {  // each key is a DOM node
    [price]: {
      id,
      type,
    },
    [optionValue]: {
      id,
      name,
      value,
    },
    [quantity],
    [optionGroup],
    [addToCart],
    [sliders],
  }
  containers: {
    product: {
      price,
      compareAtPrice,
      options: {
        [name]: value
      }
      quantity,
      variant,
    },
    lineItems: {
      key,
      properties,
      quantity,
      variant,
    },
  }
  variants: {

  }
}

const initialState = {
  node,
  store: {
    option: {
      selected: null,        // {}
      options: null,         // []
      values: null,          // []
    },
    variant: {
      selected: null,        // {}
      variantOptions: null,  // []
      variants: null,        // new Map()
    },
    quantity: null,          // Number,
  },
  nodes: {
    addToCart: new Map(),
    optionGroup: new Map(),
    optionValue: new Map(),
    price: new Map(),
    quantitySelect: new Map(),
    sliders: new Map(),
  },
};

const initialState = {
  node,
  store: {
    key: null,               // String
    properties: null,        // []
    variant: null,           // {}
    quantity: {
      current: null          // Number
    },
  },
  nodes: {
    price: new Map(),
    quantitySelect: new Map(),
  },
};

const initialState = {
  name,
  productContainer,
  $slider
};

const prices = {
  nodes: {
    self: container,
    price,
    compareAtPrice,
    linePrice,
  }
};

const optionGroup = {
  name,
  nodes: {
    self: control,
    selectedValue: selectedValueNode
  }
};

const optionValue = {
  name,
  value,
  nodes: {
    self: control,
  }
};

const quantitySelect = {
  nodes: {
    self: control,
    value: valueNode
  }
};
