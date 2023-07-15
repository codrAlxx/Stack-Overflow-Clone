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
  const [userId, setUserId] = useState(user?.result?._id)
  const [email, setEmail] = useState(user?.result?.email)
  const [isVerfied, setIsVerfied] = useState(user?.result?.verified)
  console.log(isVerfied)

  useEffect(() => {
    if (isVerfied) {
      console.log("In navigate")
      navigate(`/ChatAi`);
    }
  }, [isVerfied, navigate]);

  const handleVerify = () => {
    dispatch(sendUserOtp({userId,email}));
    setShowOtp(true);
  };

  const handleOtpVerification = useCallback(
    (otp) => {
      dispatch(verifyUserOtp(otp.trim(), email));
    },
    [dispatch]
  );

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