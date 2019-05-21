const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false
      };
    case "REGISTER_FAILED":
    case "AUTH_ERROR":
    case "LOGIN_FAILED":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
