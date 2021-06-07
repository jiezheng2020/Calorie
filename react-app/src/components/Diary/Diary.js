import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDiaries, createDiaries } from "../../store/diary";
import FoodModal from "./FoodModal";

import "./Diary.css";

const Diary = () => {
  const user = useSelector((state) => state.session.user);
  const diaries = useSelector((state) => state.diaries);
  const [modalShow, setModalShow] = useState(false);
  const [currDiary, setCurrDiary] = useState([]);
  const [currDate, setcurrDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totalCal, setTotalCal] = useState(0);
  const dispatch = useDispatch();

  useEffect(async () => {
    const res = await dispatch(fetchDiaries(currDate));
    await setCurrDiary(res[0]);
  }, [dispatch, currDate]);

  useEffect(() => {
    if (currDiary) {
      let sum = 0;
      const foodsArr = currDiary?.diaryFoods?.forEach(
        (food) => (sum += food.totalCalories)
      );
      setTotalCal(sum);
    } else {
      setTotalCal(0);
    }
  }, [currDiary]);

  const handleCreate = async () => {
    if (!currDiary) {
      const postDate = new Date(
        Number(currDate.split("-")[0]),
        Number(currDate.split("-")[1]) - 1,
        Number(currDate.split("-")[2])
      );
      const diary = await dispatch(createDiaries(postDate));

      await setCurrDiary(diary[0]);
    }
  };

  const addMeal = async () => {};

  const breakfastFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "breakfast"
  );
  const lunchFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "lunch"
  );
  const dinnerFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "dinner"
  );

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
        <div className="diary-food-header">
          <h2 className="diary-container-label">
            Meals
            <i
              onClick={() => setModalShow(true)}
              class="fas fa-plus-circle add-meals"
            ></i>
          </h2>
          <h2 className="diary-container-label"> Calories</h2>
        </div>
        <div className="diary-meal-containers">
          <div className="diary-meal-label"> Breakfast</div>
          {breakfastFood?.map((food, i) => (
            <div key={i} className="diary-meal-subcontainer">
              <div>
                {food.food.name} : item is {food.food.calories} calories per
                serving of {food.food.serving}
              </div>

              <div className="diary-meal-calories">
                <div className="diary-meal-calories-text">
                  {food.totalCalories}
                </div>
                <div className="calories-buttons">
                  <i class="fas fa-edit calories-edit"></i>
                  <i class="fas fa-minus-circle calories-remove"></i>
                </div>
              </div>
            </div>
          ))}
          {(!currDiary || breakfastFood?.length === 0) && (
            <div>No meals have been added</div>
          )}
        </div>
        <div className="diary-meal-containers">
          <div className="diary-meal-label"> Lunch</div>
          {lunchFood?.map((food, i) => (
            <div key={i} className="diary-meal-subcontainer">
              <div>
                {food.food.name} : item is {food.food.calories} calories per
                serving of {food.food.serving}
              </div>

              <div className="diary-meal-calories">
                <div className="diary-meal-calories-text">
                  {food.totalCalories}
                </div>
                <div className="calories-buttons">
                  <i class="fas fa-edit calories-edit"></i>
                  <i class="fas fa-minus-circle calories-remove"></i>
                </div>
              </div>
            </div>
          ))}
          {(!currDiary || lunchFood?.length === 0) && (
            <div>No meals have been added</div>
          )}
        </div>
        <div className="diary-meal-containers">
          <div className="diary-meal-label"> Dinner</div>
          {dinnerFood?.map((food, i) => (
            <div key={i} className="diary-meal-subcontainer">
              <div>
                {food.food.name} : item is {food.food.calories} calories per
                serving of {food.food.serving}
              </div>

              <div className="diary-meal-calories">
                <div className="diary-meal-calories-text">
                  {food.totalCalories}
                </div>
                <div className="calories-buttons">
                  <i class="fas fa-edit calories-edit"></i>
                  <i class="fas fa-minus-circle calories-remove"></i>
                </div>
              </div>
            </div>
          ))}
          {(!currDiary || dinnerFood?.length === 0) && (
            <div>No meals have been added</div>
          )}
        </div>
      </div>
      <div className="diary-food-container">
        <div className="diary-food-header">
          <h2 className="diary-container-label">
            Exercise
            <i class="fas fa-plus-circle add-meals"></i>
          </h2>
          <h2 className="diary-container-label"> Calories</h2>
        </div>
        <div className="diary-exercise-containers"></div>
      </div>
      <div className="diary-food-container total-calories-container">
        <div>Total Calories:</div>
        <div>{totalCal}</div>
      </div>
      <button onClick={() => handleCreate()}>Test</button>
      <FoodModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Diary;
