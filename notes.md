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
* update code to remove jquery
  - https://github.com/nefe/You-Dont-Need-jQuery
  - http://youmightnotneedjquery.com/
  - $().closest => el.closest
  - $().find => el.querySelectorAll
* make some of the helper/facade functions chainable


???
  • upsells
  • gift with purchase
  • back in stock

Note to Self 10/24/19
write set function in Helpers.js