const GET_EXERCISES = "exercise/GET_EXERCISES";

const getExercises = (exercises) => {
  return {
    type: GET_EXERCISES,
    exercises,
  };
};

export const fetchExercises = () => async (dispatch) => {
  const res = await fetch("api/exercise/");

  if (res.ok) {
    const exercises = await res.json();

    dispatch(getExercises(exercises));
  }
};

export const createExercise =
  ({ name }) =>
  async (dispatch) => {
    const res = await fetch("/api/exercise/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const exercise = await res.json();
      return exercise.id;
    }
  };

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES: {
      return action.exercises;
    }

    default:
      return state;
  }
}
