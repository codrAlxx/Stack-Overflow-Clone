import * as api from "../api";
import { useLocalStorage } from "../hook/useLocalStorage";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    console.log(authData)
    const { data } = await api.signUp(authData);
    console.log(data)
    dispatch({ type: "AUTH", data });
    console.log(data, "login");
    dispatch(setCurrentUser(data));
    navigate(-1);
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    console.log(data.result, "login");
    dispatch(setCurrentUser(data));
    navigate(-1);
  } catch (error) {
    console.log(error);
  }
};

export const sendUserOtp = (data) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    // console.log(data)
    await api.sendOtp(data);
    dispatch({ type: "END_LOADING" });
    dispatch({ type: "RESET_ERROR" });
  } catch (error) {
    const err = {
      success: false,
      message: "unable to email, try again later",
      location: window.location.href,
    };
    dispatch({ type: "END_LOADING" });
    dispatch({ type: "SET_ERROR", payload: err });
  }
};

export const verifyUserOtp = (OtpData) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    console.log("In verify OTP")
    console.log(OtpData)
    const { data } = await api.verifyUser(OtpData);
    dispatch({ type: "END_LOADING" });
    dispatch({ type: "UPDATE_AUTH_VERIFY", data: data.user });
    useLocalStorage(data.user);
    dispatch(setCurrentUser(data.user));
  } catch (error) {
    dispatch({ type: "END_LOADING" });
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "unable to email, try again later",
        location: window.location.href,
      },
    });
  }
};

export const follow = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.follow(id);
    useLocalStorage(data.user);
    dispatch({ type: "END_LOADING" });
    dispatch(setCurrentUser(data.user));
  } catch (error) {
    dispatch({ type: "END_LOADING" });
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "unable to email, try again later",
        location: window.location.href,
      },
    });
  }
};

export const unfollow = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.unfollow(id);
    useLocalStorage(data.user);
    dispatch({ type: "END_LOADING" });
    dispatch(setCurrentUser(data.user));
  } catch (error) {
    dispatch({ type: "END_LOADING" });
    dispatch({
      type: "SET_ERROR",
      payload: {
        success: false,
        message: "unable to email, try again later",
        location: window.location.href,
      },
    });
  }
};
