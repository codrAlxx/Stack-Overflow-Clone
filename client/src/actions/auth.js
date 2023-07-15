import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { useLocalStorage } from "../hook/useLocalStorage";

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        // console.log("In Auth Action")
        // console.log(authData);
        const { data } = await api.signUp(authData)
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({ type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')) ))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const sendUserOtp = () => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      await api.sendOtp();
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
  
  export const verifyUserOtp = (otp) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const { data } = await api.verifyUser(otp);
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
  