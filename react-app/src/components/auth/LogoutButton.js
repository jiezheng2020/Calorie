import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return (
    <button className="logout-btn" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
