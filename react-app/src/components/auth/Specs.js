import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Specs.css";

const Specs = () => {
  const user = useSelector((state) => state.session.user.username);
  return (
    <div className="specs-container">
      <div className="specs-intro">
        Hello, {user}. Thank you for choosing Calorie. Please fill out the
        fields below to complete your registration process!
      </div>
      <div>
        The below info is required to help calculate your calorie expense
        accurately
      </div>
      <div className="specs-fields-container">
        <div className="specs-fields">
          <label>Weight</label>
          <input type="number" min="0" />
        </div>
        <div className="specs-fields">
          <label>Height</label>
          <input type="number" min="0" />
        </div>
        <div className="specs-fields">
          <label>Age</label>
          <input type="number" min="0" />
        </div>
        <div className="specs-fields">
          <label>Gender</label>
          <select>
            <option value="">--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Specs;
