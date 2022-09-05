import { clientReq } from "../../axios/req";

// get all products
export const getProducts = async (dispatch) => {
  try {
    dispatch({ type: "ALL_PRODUCTS_REQUEST" });

    const { data } = await clientReq.get("/products");

    dispatch({
      type: "ALL_PRODUCTS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ALL_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErros = async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
