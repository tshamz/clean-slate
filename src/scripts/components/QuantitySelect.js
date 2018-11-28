export default class QuantitySelect {
  constructor (node, store) {
    this.controls = $(node).find('[data-quantity-change]');
    this.value = $(node).find('[data-quantity-value]');
  }

  updateQuantity () {

  }



  addEvents () {
    this.controls.on('click', event => {
      event.preventDefault();
      console.log('ding');
      console.log(event.currentTarget);

    })
  }
}
