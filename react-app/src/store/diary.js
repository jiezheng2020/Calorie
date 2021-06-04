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
