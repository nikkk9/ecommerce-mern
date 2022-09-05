// const initialState = {
//   products: [],
// };
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS_REQUEST":
      return {
        fetching: true,
        products: [],
      };

    case "ALL_PRODUCTS_SUCCESS":
      return {
        fetching: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };

    case "ALL_PRODUCTS_FAIL":
      return {
        fetching: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
