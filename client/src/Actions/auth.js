import axios from "axios";
import { setAlert } from "../Actions/alert.js";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get("/api/auth");
    dispatch({
      type: "USER_LOADED",
      payload: response.data
    });
    console.log(response.data);
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR"
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "Application/json" }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post("/api/users", body, config);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: "REGISTER_FAILED"
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "Application/json" }
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/auth", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: "LOGIN_FAILED"
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: "CLEAR_PROFILE" });
  dispatch({ type: "LOGOUT" });
};
