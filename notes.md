# Notes
* debounce clicks on quantity-selector
* use sections to create scope for snippets and prevent snippet reference leakage
* newsletter section with block for each esp form and max-blocks: 1;
* use grid
* update code to remove jquery
  - https://github.com/nefe/You-Dont-Need-jQuery
  - http://youmightnotneedjquery.com/
  - $().closest => el.closest
  - $().find => el.querySelectorAll
* make some of the helper/facade functions chainable
* include facade for super common actions
  - get current quantity
  - get selected variant
* move price containers to control
* make certain handlers their own pubsub event

???
  • upsells
  • gift with purchase
  • back in stock

// initSession
// add
// update
// remove
// updateSession
//   getExperience
//   updateExperience
// redirecToCartAndOrCheckout
