import { bindActionCreators } from "redux";

const GET_DIARIES = "diary/GET_DIARIES";
const CREATE_DIARY = "diary/CREATE_DIARY";

const getDiaries = (diary) => {
  return {
    type: GET_DIARIES,
    diary,
  };
};

const createDiary = (diary) => {
  return {
    type: GET_DIARIES,
    diary,
  };
};

export const fetchDiaries = () => async (dispatch) => {
  const res = await fetch("/api/diary/");

  if (res.ok) {
    const diary = await res.json();
    dispatch(getDiaries(diary));
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
    console.log(diary);
    // dispatch(createDiary(diary));
  }
};

const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_DIARIES: {
      return action.diary;
    }

    case CREATE_DIARY: {
      const diaryLength = state.diaries.length();
      newState = { ...state, [diaryLength]: action.diary };
      return newState;
    }
    default:
      return state;
  }
}
