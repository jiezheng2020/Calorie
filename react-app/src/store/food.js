const GET_FOODS = "food/GET_FOODS";

const getFoods = (foods) => {
  return {
    type: GET_FOODS,
    foods,
  };
};

export const fetchFoods = () => async (dispatch) => {
  const res = await fetch("api/food/");

  if (res.ok) {
    const foods = await res.json();

    dispatch(getFoods(foods));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_FOODS: {
      return action.foods;
    }

    default:
      return state;
  }
}
