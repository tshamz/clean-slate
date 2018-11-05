import { makeActionCreator } from 'common/Helpers';

import { createAction, createActions, handleActions, combineActions } from 'redux-actions';

// add item to cart
//   - addItem(id, { quantity, properties })
// update item in cart
//   - updateItem(key, { quantity, properties })
// remove item from cart
//   - removeItem(key)
// update cart note (can set/update/remove)
//   - updateNote(note)
// update cart attribute (will only add or update, will not remove single attribute)
//   - updateAttributes()
// x remove cart attribute (need to write custom functionality to do this)

// Constants
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
const UPDATE_CART_NOTE = 'UPDATE_CART_NOTE';
const UPDATE_CART_ATTRIBUTE = 'UPDATE_CART_ATTRIBUTE';
const REMOVE_CART_ATTRIBUTE = 'REMOVE_CART_ATTRIBUTE';

// const cartAdd = createAction(ADD_ITEM_TO_CART);
// const cartUpdate = createAction(UPDATE_ITEM_IN_CART);
// const cartRemove = createAction(REMOVE_ITEM_FROM_CART);
// const cartNoteUpdate = createAction(UPDATE_CART_NOTE);
// const cartAttributeUpdate = createAction(UPDATE_CART_ATTRIBUTE);
// const cartAttributeRemove = createAction(REMOVE_CART_ATTRIBUTE);

export const cartAdd = (id, quantity, properties) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: {
      id,
      options: {
        quantity,
        properties,
      }
    }
  }
};

export const cartUpdate = (key, quantity, properties) => {
  return {
    type: UPDATE_ITEM_IN_CART,
    payload: {
      key,
      options: {
        quantity,
        properties,
      }
    }
  }
};

export const cartRemove = key => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: {
      key
    }
  }
};

export const cartNoteUpdate = note => {
  return {
    type: UPDATE_CART_NOTE,
    payload: {
      note
    }
  }
};

export const cartAttributeUpdate = attribute => {
  return {
    type: UPDATE_CART_ATTRIBUTE,
    payload: {
      attribute
    }
  }
};

export const cartAttributeRemove = attribute => {
  return {
    type: REMOVE_CART_ATTRIBUTE,
    payload: {
      attribute
    }
  }
};
