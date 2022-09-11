export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "SIGNUP_REQUEST":
    case "PERSIST_REQUEST":
      return {
        fetching: true,
        authenticated: false,
      };

    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
    case "PERSIST_SUCCESS":
      return {
        ...state,
        fetching: false,
        authenticated: true,
        user: action.payload,
      };

    case "LOGIN_FAIL":
    case "SIGNUP_FAIL":
      return {
        ...state,
        fetching: false,
        authenticated: false,
        user: null,
        error: action.payload,
      };

    case "PERSIST_FAIL":
      return {
        fetching: false,
        authenticated: false,
        user: null,
        // error: action.payload,
      };

    case "LOGOUT_SUCCESS":
      return {
        fetching: false,
        user: null,
        authenticated: false,
      };

    case "LOGOUT_FAIL":
      return {
        ...state,
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
