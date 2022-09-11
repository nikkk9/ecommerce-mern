// you can use initialState for each reducer
// const initialState = {
//   products: [],
// };

// all products
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
        totalProduct: action.payload.totalProduct,
        productPerPage: action.payload.productPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
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

// single product
export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return {
        fetching: true,
        ...state,
      };

    case "PRODUCT_SUCCESS":
      return {
        fetching: false,
        product: action.payload,
      };

    case "PRODUCT_FAIL":
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
