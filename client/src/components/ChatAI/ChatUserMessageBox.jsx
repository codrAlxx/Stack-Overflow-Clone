import React from "react";
import Avatar from "../Avatar/Avatar";
import User from "./User";

import { useSelector } from "react-redux";
export const ChatUserMessageBox = ({ message }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  // console.log(currentUser?.result?.name[0])
  return (
    <div className="chat-message-box">
      <div className="w-10">
        <User user={currentUser} key={currentUser?._id} />
        <p className="message-box">{message}</p>
      </div>
      
    </div>
  );
};
