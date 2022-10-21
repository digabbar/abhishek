import axios from "axios";
import { authAction } from "../slice/authSlice";
import { userAction } from "../slice/userSlice";
import { forgetAction } from "../slice/forgetSlice";
// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(authAction.login_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch(authAction.login_success(data.user));
  } catch (error) {
    console.log(error);
    dispatch(authAction.login_fail(error.response.data.message));
  }
};

// register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authAction.register_user_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(authAction.register_user_success(data.user));
  } catch (error) {
    console.log(error);
    dispatch(authAction.register_user_fail(error.response.data.message));
  }
};
// load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(authAction.load_user_req());
    const { data } = await axios.get("/api/v1/me");
    dispatch(authAction.load_user_success(data.user));
  } catch (error) {
    console.log(error);
    dispatch(authAction.load_user_fail(error.response.data.message));
  }
};
//logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch(authAction.logout_success());
  } catch (error) {
    console.log(error);
    dispatch(authAction.logout_fail(error.response.data.message));
  }
};

// update profile

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(userAction.update_profile_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch(userAction.update_profile_success(data.success));
  } catch (error) {
    console.log(error);
    dispatch(userAction.update_profile_fail(error.response.data.message));
  }
};
//update password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(userAction.update_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/v1/password/update",
      userData,
      config
    );
    dispatch(userAction.update_password_success(data.success));
  } catch (error) {
    console.log(error);
    dispatch(userAction.update_password_fail(error.response.data.message));
  }
};
//forget password
export const forgetPassword = (userData) => async (dispatch) => {
  try {
    dispatch(forgetAction.forget_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/password/forget",
      userData,
      config
    );
    dispatch(forgetAction.forget_password_success(data));
  } catch (error) {
    console.log(error);
    dispatch(forgetAction.forget_password_fail(error.response.data.message));
  }
};
// reset password
//forget password
export const resetPassword = (token, userData) => async (dispatch) => {
  try {
    dispatch(forgetAction.new_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      userData,
      config
    );
    dispatch(forgetAction.new_password_success(data));
  } catch (error) {
    console.log(error);
    dispatch(forgetAction.new_password_fail(error.response.data.message));
  }
};

export const clearError = (key) => async (dispatch) => {
  if (key === "auth") {
    dispatch(authAction.clear());
  }
  if (key === "user") {
    dispatch(userAction.clear());
  }
  if (key === "forget") {
    dispatch(forgetAction.clear());
  }
};
