# Notes
* debounce clicks on quantity-selector
* use sections to create scope for snippets and prevent snippet reference leakage
* newsletter section with block for each esp form and max-blocks: 1;
* `data-product-container="{{ product.handle }}"` attribute on element that holds data about a specific product (e.g. product-card, product page add to cart form, etc.)
* use Maps with dom nodes as keys to keep track of different states
* every snippet needs a `classes` and `extra_attrs` property to prevent fall through from parent snippets
* use grid

Product
  • Variant
    - productContainer
    - id ==>
    - optionValues <==
    - Inventory
    - available ==>
    - inventory ==>
  • AddToCart
    - productContainer
    - variantId <==
    - quantity <==
    - lineItemProperty
  • Slider
    - productContainer
    - name
    - $slider
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

Nodes:
  • Acted On:
    - AddToCart
    - QuantitySelect
    - OptionGroup

  • Respond to Action:
    - AddToCart
    - QuantitySelect
    - OptionGroup
    - Price
    - Slider

Non-Nodes:
  • Variant
