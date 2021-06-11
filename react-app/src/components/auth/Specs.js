import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSpecs } from "../../store/session";

import "./Specs.css";

const Specs = () => {
  const user = useSelector((state) => state.session.user.username);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmr, setBmr] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (weight && height && age && gender) {
      if (gender === "female") {
        setBmr(10 * weight + 6.25 * height - 5 * age - 161);
      } else if (gender === "male") {
        setBmr(10 * weight + 6.25 * height - 5 * age - 5);
      }
    }
  }, [gender, weight, height, age]);

  const handleCreate = async () => {
    await dispatch(
      setSpecs({ gender, weight: weight * 2.205, height, age, bmr })
    );
    history.push("/");
  };

  return (
    <div className="specs-container">
      <div className="specs-intro">
        Hello, {user}. Thank you for choosing Calorie. Please fill out the
        fields below to complete your registration process!
      </div>
      <div style={{ color: "red" }}>
        The below info is required to help calculate your calorie expense
        accurately
      </div>
      <div style={{ margin: "20px 0px" }}>
        {`Your BMR (Basal Metabolic Rate: energy expended at rest) will be calculated via the Mifflin-St Jeor Equation`}{" "}
      </div>
      <div>For men: BMR = {`10(Weight) + 6.25(Height) - 5(Age) + 5`}</div>
      <div>For women: BMR = {`10(Weight) + 6.25(Height) - 5(Age) - 161`}</div>

      <div className="specs-fields-container">
        <div className="specs-fields">
          <label>Weight</label>
          <input
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            min="1"
          />{" "}
          kg
        </div>
        <div className="specs-fields">
          <label>Height</label>
          <input
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            min="1"
          />{" "}
          cm
        </div>
        <div className="specs-fields">
          <label>Age</label>
          <input
            onChange={(e) => setAge(e.target.value)}
            type="number"
            min="1"
          />
        </div>
        <div className="specs-fields">
          <label>Gender</label>
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="">--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={{ fontWeight: "bold", margin: "20px 0" }}>
          Current calculated BMR: {bmr ? `${bmr} calories` : "N/A"}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            disabled={!bmr}
            onClick={() => handleCreate()}
            className="confirm-btn"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Specs;
