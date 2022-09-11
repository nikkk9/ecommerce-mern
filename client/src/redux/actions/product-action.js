import { clientReq } from "../../axios/req";

// get all products
export const getProducts =
  (keyword = "", currPage = 1, price = [0, 30000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCTS_REQUEST" });

      let link = `/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await clientReq.get(link);

      dispatch({
        type: "ALL_PRODUCTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCTS_FAIL",
        payload: error.response.data,
      });
    }
  };

// get single products
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_REQUEST" });

    const { data } = await clientReq.get(`/product/${id}`);

    dispatch({
      type: "PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCT_FAIL",
      payload: error.response.data,
    });
  }
};

// clearing errors
export const clearErros = async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
