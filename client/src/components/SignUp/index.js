import React, { useState } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { ApiUrl } from "../Api/api";
const SignUp = () => {
  const [mobile, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const updateMobileNum = (e) => {
    setMobileNum(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const changePath = () => {
    history.replace("/signin");
  };

  function isNumeric(str) {
    const regex = /^\d+$/;
    return regex.test(str);
  }

  const submitForm = (e) => {
    e.preventDefault();

    const userDetails = {
      mobile,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const url = `${ApiUrl}/signup`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          changePath();
          // console.log(data.success);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isNumeric(mobile)) {
      if (mobile.length === 10) {
        fetchData();
      } else {
        setError("Mobile number should consist of 10 digits");
      }
    } else {
      setError("Mobile number should contain only numbers");
    }
  };

  return (
    <div className="sign-up-success-bg">
      <form onSubmit={submitForm} className="form-success-up">
        <div className="input-containers-up">
          <label className="form-success-label-up" htmlFor="mobileup">
            User mobile number
          </label>
          <input
            required
            maxLength={10}
            value={mobile}
            onChange={updateMobileNum}
            placeholder="Enter mobile number...."
            className="form-success-input-up"
            type="text"
            id="mobileup"
            autoComplete="username"
          />
        </div>

        <div className="input-containers-up">
          <label className="form-success-label-up" htmlFor="passwordup">
            Set Password
          </label>
          <input
            required
            onChange={updatePassword}
            value={password}
            placeholder="Enter password...."
            className="form-success-input-up"
            type={showPassword ? "text" : "password"}
            id="passwordup"
            autoComplete="current-password"
          />
        </div>

        {showPassword ? (
          <div className="password-show-parent">
            <BiShow
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-icon"
            />
            <span>Hide Password</span>
          </div>
        ) : (
          <div className="password-show-parent">
            <BiSolidHide
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-icon"
            />
            <span>Show Password</span>
          </div>
        )}

        <button className="sign-up-button" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <span onClick={changePath} className="sign-up">
            Sign In
          </span>
        </p>
        <p className="signup-error">{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
