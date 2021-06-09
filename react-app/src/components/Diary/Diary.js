import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDiaries,
  createDiaries,
  editFoodEntry,
  deleteFoodEntry,
  editExerciseEntry,
  deleteExerciseEntry,
} from "../../store/diary";
import FoodModal from "./FoodModal";
import ExerciseModal from "./ExerciseModal";

import "./Diary.css";

const Diary = () => {
  const user = useSelector((state) => state.session.user);
  const diaries = useSelector((state) => state.diaries);
  const [foodmodalShow, setfoodModalShow] = useState(false);
  const [activeEdit, setactiveEdit] = useState("");
  const [activeExercise, setactiveExercise] = useState("");
  const [editCalories, seteditCalories] = useState(0);
  const [editExerciseCalories, seteditExerciseCalories] = useState("");
  const [exerciseModalShow, setexerciseModalShow] = useState(false);
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

      const exerArr = currDiary?.diaryExercise?.forEach(
        (exercise) => (sum -= exercise.totalCalories)
      );

      setTotalCal(sum);
    } else {
      setTotalCal(0);
    }
  }, [currDiary, diaries]);

  const handleCreateFood = async () => {
    if (!currDiary) {
      const postDate = new Date(
        Number(currDate.split("-")[0]),
        Number(currDate.split("-")[1]) - 1,
        Number(currDate.split("-")[2])
      );
      const diary = await dispatch(createDiaries(postDate));
      setCurrDiary(diary);
    }
    setfoodModalShow(true);
  };

  const handleCreateExercise = async () => {
    if (!currDiary) {
      const postDate = new Date(
        Number(currDate.split("-")[0]),
        Number(currDate.split("-")[1]) - 1,
        Number(currDate.split("-")[2])
      );
      const diary = await dispatch(createDiaries(postDate));
      await setCurrDiary(diary);
    }
    setexerciseModalShow(true);
  };

  const handleEditFood = async (food) => {
    await dispatch(
      editFoodEntry({
        foodId: food.id,
        totalCalories: editCalories,
      })
    );
    setactiveEdit("");
    seteditCalories(0);
  };

  const handleEditExercise = async (exercise) => {
    await dispatch(
      editExerciseEntry({
        exerciseId: exercise.id,
        totalCalories: editExerciseCalories,
      })
    );

    setactiveExercise("");
    seteditExerciseCalories(0);
  };

  const handleDeleteFood = async (food) => {
    await dispatch(
      deleteFoodEntry({
        foodId: food.id,
      })
    );
  };

  const handleDeleteExercise = async (exercise) => {
    await dispatch(
      deleteExerciseEntry({
        exerciseId: exercise.id,
      })
    );
  };
  const breakfastFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "breakfast"
  );
  const lunchFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "lunch"
  );
  const dinnerFood = currDiary?.diaryFoods?.filter(
    (food) => food.mealType === "dinner"
  );

  const exercises = currDiary?.diaryExercise;

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
              onClick={() => handleCreateFood()}
              className="fas fa-plus-circle add-meals"
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
                  <i
                    onClick={() => setactiveEdit(food.id)}
                    className="fas fa-edit calories-edit"
                  />
                  <div hidden={activeEdit !== food.id} className="edit-box">
                    <input
                      onChange={(e) => seteditCalories(e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Enter calories amount"
                    ></input>
                    <i
                      onClick={() => handleEditFood(food)}
                      className="fas fa-check"
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={() => setactiveEdit("")}
                    ></i>
                  </div>

                  <i
                    onClick={() => handleDeleteFood(food)}
                    className="fas fa-minus-circle calories-remove"
                  ></i>
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
                  <i
                    onClick={() => setactiveEdit(food.id)}
                    className="fas fa-edit calories-edit"
                  />
                  <div hidden={activeEdit !== food.id} className="edit-box">
                    <input
                      onChange={(e) => seteditCalories(e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Enter calories amount"
                    ></input>
                    <i
                      onClick={() => handleEditFood(food)}
                      className="fas fa-check"
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={() => setactiveEdit("")}
                    ></i>
                  </div>

                  <i
                    onClick={() => handleDeleteFood(food)}
                    className="fas fa-minus-circle calories-remove"
                  ></i>
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
                  <i
                    onClick={() => setactiveEdit(food.id)}
                    className="fas fa-edit calories-edit"
                  />
                  <div hidden={activeEdit !== food.id} className="edit-box">
                    <input
                      onChange={(e) => seteditCalories(e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Enter calories amount"
                    ></input>
                    <i
                      onClick={() => handleEditFood(food)}
                      className="fas fa-check"
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={() => setactiveEdit("")}
                    ></i>
                  </div>

                  <i
                    onClick={() => handleDeleteFood(food)}
                    className="fas fa-minus-circle calories-remove"
                  ></i>
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
            <i
              onClick={() => handleCreateExercise()}
              className="fas fa-plus-circle add-meals"
            ></i>
          </h2>
          <h2 className="diary-container-label"> Calories</h2>
        </div>
        <div className="diary-exercise-containers">
          {exercises?.map((exercise, i) => (
            <div key={i} className="diary-meal-subcontainer">
              <div>
                {exercise.exercise.name} : exercise burns{" "}
                {exercise.exercise.cpm} calories per pound per minute
              </div>

              <div className="diary-meal-calories">
                <div className="diary-meal-calories-text">
                  {exercise.totalCalories}
                </div>
                <div className="calories-buttons">
                  <i
                    onClick={() => setactiveExercise(exercise.id)}
                    className="fas fa-edit calories-edit"
                  />
                  <div
                    hidden={activeExercise !== exercise.id}
                    className="edit-box"
                  >
                    <input
                      onChange={(e) => seteditExerciseCalories(e.target.value)}
                      type="number"
                      min="0"
                      placeholder="Enter calories amount"
                    ></input>
                    <i
                      onClick={() => handleEditExercise(exercise)}
                      className="fas fa-check"
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={() => setactiveExercise("")}
                    ></i>
                  </div>

                  <i
                    onClick={() => handleDeleteExercise(exercise)}
                    className="fas fa-minus-circle calories-remove"
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="diary-food-container total-calories-container">
        <div>Total Calories:</div>
        <div>{totalCal}</div>
      </div>
      <FoodModal show={foodmodalShow} onHide={() => setfoodModalShow(false)} />
      <ExerciseModal
        show={exerciseModalShow}
        onHide={() => setexerciseModalShow(false)}
      />
    </div>
  );
};

export default Diary;
