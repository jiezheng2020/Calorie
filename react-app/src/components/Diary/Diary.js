import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDiaries } from "../../store/diary";

import "./Diary.css";

const Diary = () => {
  const user = useSelector((state) => state.session.user);
  const diaries = useSelector((state) => state.diaries);
  const [currDiary, setCurrDiary] = useState([]);
  const [currDate, setcurrDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiaries());
  }, [dispatch]);

  useEffect(() => {
    if (diaries.length) {
      setCurrDiary(diaries.filter((diary) => diary.date.includes(currDate)));
    }
  }, [diaries, currDate]);

  return (
    <div>
      <input
        type="date"
        value={currDate}
        onChange={(e) => setcurrDate(e.target.value)}
      ></input>
      <div></div>
    </div>
  );
};

export default Diary;
