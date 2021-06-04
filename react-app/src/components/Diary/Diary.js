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
    <div className="diary-container">
      <div className="diary-header">
        <div className="diary-header-text">Your Diary for:</div>
        <input
          className="date-input"
          type="date"
          value={currDate}
          onChange={(e) => setcurrDate(e.target.value)}
        ></input>
      </div>
      <div className="diary-food-container">
        <h2 className="diary-container-label">Meals</h2>
        <div className="diary-meal-containers top-meal">
          <div className="diary-meal-label"> Breakfast</div>
          <div className="diary-meal-subcontainer">
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
          </div>
        </div>
        <div className="diary-meal-containers">
          <div className="diary-meal-label"> Lunch</div>
          <div className="diary-meal-subcontainer">
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
          </div>
        </div>
        <div className="diary-meal-containers">
          <div className="diary-meal-label"> Dinner</div>
          <div className="diary-meal-subcontainer">
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
            <div>Food1</div>
          </div>
        </div>
      </div>
      <div className="diary-food-container">
        <h2 className="diary-container-label">Exercise</h2>
        <div className="diary-exercise-containers"></div>
      </div>
    </div>
  );
};

export default Diary;
