import { bindActionCreators } from "redux";

const GET_DIARIES = "diary/GET_DIARIES";

const getDiaries = (diary) => {
  return {
    type: GET_DIARIES,
    diary,
  };
};

export const fetchDiaries = () => async (dispatch) => {
  const res = await fetch("/api/diary/");

  console.log(res);

  if (res.ok) {
    const diary = await res.json();
    console.log(diary);
    // dispatch(getDiary(diary));
  }
};

const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DIARIES: {
      return action.diary;
    }
    default:
      return state;
  }
}
