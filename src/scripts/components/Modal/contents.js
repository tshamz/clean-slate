const closeModal = `<button class="oo-button button--secondary" data-close-modal>Close</button>`;

const notEnoughInventory = data => {
  const { newQuantity, inventory } = data;
  return `
    <h2 class="modal-title">Oops...</h2>
    <div class="modal-body">We currently don't have enough inventory of that Item. You requested ${newQuantity} but we only have ${inventory}. Please Adjust your selection and try again.</div>
    ${closeModal}
  `;
};

export default {
  ['not-enough-inventory']: notEnoughInventory,
};
