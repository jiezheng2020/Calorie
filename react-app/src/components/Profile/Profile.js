import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaries } from "../../store/diary";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [currDate, setcurrDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [currDiary, setCurrDiary] = useState([]);

  useEffect(async () => {
    const res = await dispatch(fetchDiaries(currDate));

    await setCurrDiary(res[0]);
  }, [dispatch, currDate]);

  return (
    <div className="auth-container">
      <div className="profile-container">User Profile</div>
    </div>
  );
};

export default Profile;
