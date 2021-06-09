import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises } from "../../store/exercise";

function ExerciseModal(props) {
  const DiaryId = useSelector((state) => state.diaries[0]?.id);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [customExercise, setcustomExercise] = useState("");
  const [customCalories, setcustomCalories] = useState(0);
  const [defaultExercise, setdefaultExercise] = useState("");
  const [defaultMinutes, setdefaultMinutes] = useState(0);
  const exercises = useSelector((state) => state.exercises);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(fetchExercises());
  }, [dispatch]);

  useEffect(() => {
    if (searchInput.length !== 0) {
      setsearchResults(
        exercises.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setsearchResults("");
    }
  }, [searchInput]);

  const handleCreate = async () => {
    props.onHide();
    if (defaultExercise !== "") {
      const newExercise = {
        exerciseId: defaultExercise.id,
        diaryId: DiaryId,
        // Need more logic
      };
      console.log(defaultExercise);
    }
  };

  const handledefaultExercise = (result) => {
    setdefaultExercise(result);
    setSearchInput("");
    setsearchResults("");
    setcustomExercise("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add an Exercise Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="add-meal-container">
            <div className="add-meal-left">
              <label>Create your custom exercise</label>
              <input
                onChange={(e) => {
                  setcustomExercise(e.target.value);
                }}
                type="text"
                disabled={defaultExercise}
              />
            </div>
            <h3> OR </h3>
            <div className="add-meal-right">
              <div>
                <label>Search for your exercise</label>
                <i
                  onClick={() => setdefaultExercise("")}
                  className="fas fa-eraser"
                ></i>
              </div>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                value={searchInput}
                disabled={customExercise.length > 0}
              ></input>
              {defaultExercise && (
                <div className="food-confirmed">
                  <div> selected {defaultExercise.name}</div>
                  <div> calories per lb per min: {defaultExercise.cpm}</div>
                  <div>
                    <input
                      type="number"
                      placeholder="Minutes exercised"
                      onChange={(e) => setdefaultMinutes(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="search-results">
                {searchResults.length > 0 &&
                  searchResults.map((result) => (
                    <div
                      onClick={() => handledefaultExercise(result)}
                      className="result-row"
                      key={result.id}
                    >
                      {result.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="add-meal-bottom">
            <label>Custom exercise total calories</label>
            <div>
              <input
                onChange={(e) => {
                  setcustomCalories(e.target.value);
                }}
                type="number"
                min="0"
                disabled={defaultExercise}
              />
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={
            (defaultExercise && customExercise) ||
            (!defaultExercise && !customExercise) ||
            (defaultExercise && !defaultMinutes)
          }
          className="modal-btn"
          onClick={() => handleCreate()}
        >
          Add Entry
        </Button>
        <Button className="modal-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExerciseModal;
