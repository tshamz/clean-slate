# Notes
* debounce clicks on quantity-selector
* use sections to create scope for snippets and prevent snippet reference leakage
* newsletter section with block for each esp form and max-blocks: 1;
* `data-product-container="{{ product.handle }}"` attribute on element that holds data about a specific product (e.g. product-card, product page add to cart form, etc.)
* use Maps with dom nodes as keys to keep track of different states
* every snippet needs a `classes` and `extra_attrs` property to prevent fall through from parent snippets
* use grid
* log when container has already been registered

* set key on variant map to array of options (instead of node)
* data on topic publish is product container and node
* register function takes node, product container, data


Product Container
  • variant
    - options
    - variantOptions
    - variants
    - selected
  • quantity

???
  • upsells
  • gift with purchase
  • back in stock

Nodes / Controls
  • AddToCart
    - productContainer
    - variantId <==
    - quantity <==
    - lineItemProperty
  • Price
    - productContainer
    - current
    - min
    - max <==
  • QuantitySelect
    - productContainer
    - current
    - max <== Inventory
    - min
  • OptionGroup
    - productContainer
    - name
    - selected
    - values ==>

Slider
  • productContainer
  • name
  • $slider
