import React, { useCallback, useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./verify.css";
import { useDispatch, useSelector } from "react-redux";
import { sendUserOtp, verifyUserOtp } from "../../actions/auth";
import { VerifyBtn } from "./VerifyBtn";
import { OtpVerify } from "./OtpVerify";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [showOtp, setShowOtp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, location } = useSelector((state) => state.loadingReducer);
  const user = useSelector((state) => state.currentUserReducer);
  // console.log(user)
  const [userId, setUserId] = useState(user?._id)
  const [email, setEmail] = useState(user?.email)
  const [isVerfied, setIsVerfied] = useState(user?.verified)
  // console.log({userId,email,isVerfied})

  useEffect(() => {
    if (user.verified) {
      console.log("In navigate")
      navigate(`/ChatAi`);
    }
  }, [user.verified, navigate]);

  const handleVerify = () => {
    dispatch(sendUserOtp({userId,email}));
    setShowOtp(true);
  };

  const handleOtpVerification = (code) => {
    dispatch(verifyUserOtp({code,email}))
    console.log({userId,email,isVerfied})
  }

  // const handleOtpVerification = useCallback(
  //   (otp) => {
  //     console.log(otp);
  //     SetCode(otp);
  //     dispatch(verifyUserOtp({code, email}));
  //   },
  //   [dispatch]
  // );

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        {!showOtp ? (
          <VerifyBtn handleVerify={handleVerify} />
        ) : (
          <OtpVerify
            handleOtpVerification={handleOtpVerification}
            loading={loading}
            location={location}
          />
        )}
      </div>
    </div>
  );
};

export default Verify