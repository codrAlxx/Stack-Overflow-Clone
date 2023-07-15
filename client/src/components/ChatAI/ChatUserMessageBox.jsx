import React from "react";
import Avatar from "../Avatar/Avatar";

import { useSelector } from "react-redux";
export const ChatUserMessageBox = ({ message }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  // console.log(currentUser?.result?.name[0])
  return (
    <div className="chat-message-box">
      <div className="w-10">
      <Avatar className={"avatar-user-nav"} backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'>{currentUser?.result?.name?.charAt(0).toUpperCase()}</Avatar>
        {/* <Avatar classname={"avatar-user-nav"}>
          {currentUser ? currentUser?.result?.name[0] : ":("}
        </Avatar> */}
      </div>
      <p className="message-box">{message}</p>
    </div>
  );
};
