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
  const [serving, setServing] = useState(0);
  const [customFood, setcustomFood] = useState(null);
  const [defaultFood, setdefaultFood] = useState(null);
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
              <input type="text" />
            </div>
            <h3> OR </h3>
            <div className="add-meal-right">
              <label>Search for your food</label>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
              ></input>
              <div className="search-results">
                {searchResults.length > 0 &&
                  searchResults.map((result) => (
                    <div className="result-row">{result.name} </div>
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
              <input type="text" onChange={(e) => setServing(e.target.value)} />
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button>Add Entry</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FoodModal;
