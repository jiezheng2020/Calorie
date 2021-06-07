import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../store/food";
import "./Modal.css";

function FoodModal(props) {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [mealType, setmealType] = useState("");
  const [serving, setServing] = useState("");
  const [customFood, setcustomFood] = useState("");
  const [defaultFood, setdefaultFood] = useState("");
  const foods = useSelector((state) => state.foods);

  useEffect(async () => {
    await dispatch(fetchFoods());
  }, [dispatch]);

  useEffect(() => {
    if (searchInput.length !== 0) {
      setsearchResults(
        foods.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setsearchResults("");
    }
  }, [searchInput]);

  const handleCreate = () => {
    props.onHide();
    console.log(defaultFood);
    console.log(customFood);
  };

  const handledefaultFood = (result) => {
    setdefaultFood(result);
    setSearchInput("");
    setsearchResults("");
  };
  console.log(defaultFood);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Meal Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="add-meal-container">
            <div className="add-meal-left">
              <label>Create your custom food</label>
              <input
                onChange={(e) => {
                  setcustomFood(e.target.value);
                }}
                type="text"
              />
            </div>
            <h3> OR </h3>
            <div className="add-meal-right">
              <div>
                <label>Search for your food</label>
                <i onClick={() => setdefaultFood("")} class="fas fa-eraser"></i>
              </div>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                value={searchInput}
              ></input>
              {defaultFood && (
                <div className="food-confirmed">
                  <div> selected {defaultFood.name}</div>
                  <div> size: {defaultFood.serving}</div>
                </div>
              )}
              <div className="search-results">
                {searchResults.length > 0 &&
                  searchResults.map((result) => (
                    <div
                      onClick={() => handledefaultFood(result)}
                      className="result-row"
                    >
                      {result.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="add-meal-bottom">
            <label>Select Meal Type</label>
            <div>
              <select onChange={(e) => setmealType(e.target.value)}>
                <option value="">--</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <label>Input Serving Amount</label>
            <div>
              <input
                type="number"
                min="1"
                max="30"
                onChange={(e) => setServing(e.target.value)}
              />
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={
            (defaultFood && customFood) ||
            (!defaultFood && !customFood) ||
            !mealType ||
            !serving
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

export default FoodModal;
