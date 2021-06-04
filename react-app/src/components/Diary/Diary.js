import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDiaries } from "../../store/diary";

import "./Diary.css";

const Diary = () => {
  const user = useSelector((state) => state.session.user);
  const [currDate, setcurrDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiaries());
  }, [dispatch]);

  return <div> Diary Page</div>;
};

export default Diary;
