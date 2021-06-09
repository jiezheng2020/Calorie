const GET_DIARIES = "diary/GET_DIARIES";
const CREATE_DIARY = "diary/CREATE_DIARY";
const CREATE_FOODENTRY = "food/CREATE_FOODENTRY";
const EDIT_FOODENTRY = "food/EDIT_FOODENTRY";
const DELETE_FOODENTRY = "food/DELETE_FOODENTRY";
const CREATE_EXERCISEENTRY = "exercise/CREATE_EXERCISEENTRY";
const EDIT_EXERCISEENTRY = "exercise/EDIT_EXERCISEENTRY";
const DELETE_EXERCISEENTRY = "exercise/DELETE_EXERCISEENTRY";

const getDiaries = (diary) => {
  return {
    type: GET_DIARIES,
    diary,
  };
};

const createDiary = (diary) => {
  return {
    type: CREATE_DIARY,
    diary,
  };
};

const createFoodEntries = (food) => {
  return {
    type: CREATE_FOODENTRY,
    food,
  };
};

const editFoodEntries = (food) => {
  return {
    type: EDIT_FOODENTRY,
    food,
  };
};

const deleteFoodEntries = (foodId) => {
  return {
    type: DELETE_FOODENTRY,
    foodId,
  };
};

const createExerciseEntries = (exercise) => {
  return {
    type: CREATE_EXERCISEENTRY,
    exercise,
  };
};

const editExerciseEntries = (exercise) => {
  return {
    type: EDIT_EXERCISEENTRY,
    exercise,
  };
};

const deleteExerciseEntries = (exerciseId) => {
  return {
    type: DELETE_EXERCISEENTRY,
    exerciseId,
  };
};

export const fetchDiaries = (currDate) => async (dispatch) => {
  const res = await fetch("/api/diary/");

  if (res.ok) {
    const diary = await res.json();
    const userDiary = diary.filter((diaries) =>
      diaries.date.includes(currDate)
    );

    dispatch(getDiaries(userDiary));
    return userDiary;
  }
};

export const createDiaries = (currDate) => async (dispatch) => {
  const res = await fetch("/api/diary/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currDate }),
  });

  if (res.ok) {
    const diary = await res.json();
    dispatch(createDiary(diary));
    return diary;
  }
};

export const createFoodEntry =
  ({ foodId, diaryId, mealType, totalCalories }) =>
  async (dispatch) => {
    const res = await fetch("/api/food/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId, diaryId, mealType, totalCalories }),
    });

    if (res.ok) {
      const food = await res.json();
      dispatch(createFoodEntries(food));
    }
  };

export const editFoodEntry =
  ({ foodId, totalCalories }) =>
  async (dispatch) => {
    const res = await fetch(`/api/food/entry/${foodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalCalories }),
    });

    if (res.ok) {
      const food = await res.json();
      dispatch(editFoodEntries(food));
    }
  };

export const deleteFoodEntry =
  ({ foodId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/food/entry/${foodId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteFoodEntries(foodId));
    }
  };

export const createExerciseEntry =
  ({ exerciseId, diaryId, totalCalories }) =>
  async (dispatch) => {
    const res = await fetch("/api/exercise/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exerciseId, diaryId, totalCalories }),
    });

    if (res.ok) {
      const exercise = await res.json();
      dispatch(createExerciseEntries(exercise));
    }
  };

export const editExerciseEntry =
  ({ exerciseId, totalCalories }) =>
  async (dispatch) => {
    const res = await fetch(`/api/exercise/entry/${exerciseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalCalories }),
    });

    if (res.ok) {
      const exercise = await res.json();
      dispatch(editExerciseEntries(exercise));
    }
  };

export const deleteExerciseEntry =
  ({ exerciseId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/exercise/entry/${exerciseId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteExerciseEntries(exerciseId));
    }
  };

const initialState = [];
export default function reducer(state = initialState, action) {
  let newState = [];

  switch (action.type) {
    case GET_DIARIES: {
      return action.diary;
    }

    case CREATE_DIARY: {
      newState = [...state, action.diary];

      return newState;
    }
    case CREATE_FOODENTRY: {
      newState = [...state];
      newState[0].diaryFoods.push(action.food);
      return newState;
    }
    case EDIT_FOODENTRY: {
      let index = 0;
      newState = [...state];
      newState[0].diaryFoods.forEach((entry, i) => {
        if (entry.id == action.food.id) {
          index = i;
        }
      });

      newState[0].diaryFoods.splice(index, 1, action.food);
      return newState;
    }

    case DELETE_FOODENTRY: {
      let index = 0;
      newState = [...state];
      newState[0].diaryFoods.forEach((entry, i) => {
        if (entry.id == action.foodId) {
          index = i;
        }
      });

      newState[0].diaryFoods.splice(index, 1);
      return newState;
    }

    case CREATE_EXERCISEENTRY: {
      newState = [...state];
      newState[0].diaryExercise.push(action.exercise);
      return newState;
    }
    case EDIT_EXERCISEENTRY: {
      let index = 0;
      newState = [...state];
      newState[0].diaryExercise.forEach((entry, i) => {
        if (entry.id == action.exercise.id) {
          index = i;
        }
      });

      newState[0].diaryExercise.splice(index, 1, action.exercise);
      return newState;
    }

    case DELETE_EXERCISEENTRY: {
      let index = 0;
      newState = [...state];
      newState[0].diaryExercise.forEach((entry, i) => {
        if (entry.id == action.exerciseId) {
          index = i;
        }
      });

      newState[0].diaryExercise.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
}
