import { clientReq } from "../../axios/req";

// login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await clientReq.post(
      "/login",
      { email, password },
      config
    );
    // console.log(data);

    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
  }
};

// register
export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNUP_REQUEST" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await clientReq.post("/signup", userData, config);

    dispatch({ type: "SIGNUP_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SIGNUP_FAIL",
      payload: error.response.data,
    });
  }
};

// logout
export const logoutUser = () => async (dispatch) => {
  try {
    await clientReq.get("/logout");

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data });
  }
};

// persist user data
export const persistUser = () => async (dispatch) => {
  try {
    dispatch({ type: "PERSIST_REQUEST" });

    const { data } = await clientReq.get("/profile");
    console.log(data);

    dispatch({ type: "PERSIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PERSIST_FAIL", payload: error.response.data });
  }
};

// clearing errors
export const clearErros = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
