export const initialState = {
  user: {
    name: 'Unknown User',
    cart: [],
    addresses: [],
    orders: [],
  },
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...state.user.cart, {product: action.payload, quantity: 1}]
        },
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        user: {
          ...state.user,
          cart: state.user.cart.filter(cartProduct => cartProduct.product !== action.payload)
        },
      }
    case 'ADD_ADDRESS':
      return {
        ...state,
        user: {
          ...state.user,
          addresses: [...state.user.addresses, action.payload],
        },
      }
    case 'COMPLETE_ORDER':
      return {
        ...state,
        user: {
          ...state.user,
          orders: [...state.user.orders, action.payload],
          cart: [],
        },
      }
    case 'SET_USERS_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        },
      }
    default:
      break
  }
}