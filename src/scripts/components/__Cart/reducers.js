export function person(state = initialState.person, action) {
  switch (action.type) {
    case UPDATE_RELATIONSHIP:
      return { ...state, relationship: action.relationship };
    case UPDATE_GENDER:
      return { ...state, gender: action.gender };
    case UPDATE_FANCY_NAME:
      return { ...state, fancyName: action.fancyName };
    default:
      return state;
  }
}

export function price(state = initialState.price, action) {
  switch (action.type) {
    case UPDATE_PRICE:
      return action.price;
    default:
      return state;
  }
}

export function interests(state = initialState.interests, action) {
  switch (action.type) {
    case TOGGLE_INTEREST:
      return !state.includes(action.interests)
        ? [...state, action.interests]
        : state.filter(interest => interest !== action.interests);
    default:
      return state;
  }
}
