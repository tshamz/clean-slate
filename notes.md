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


# Buddy

* eslint
* stylelint
* automated testing
* uncss
* personal/private pipeline for individual developers

## Pipelines

* A pipeline is a set of actions, executed by a Git push or by a developer in a specific order that delivers an app or website from a Git repository to wherever a developer wants.

* Industrial production lines vary depending on the nature of the business. In case of software delivery it’s exactly the same – they will be different for every project and every team, depending on the technology and the approach used. However, every pipeline has the same major sections:

* Project
  * Repository
  * Pipeline(s)
    * Action (Build and Integrate)
    * Action (Test)
    * Action (Deploy)
