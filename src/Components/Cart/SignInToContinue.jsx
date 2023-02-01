import React from "react";

import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
const SignInToContinue = ({}) => {
  const navigate = useNavigate();
  function GoToSignIn() {
    navigate("/signinuser");
  }

  function GoToSignUp() {
    navigate("/signupuser");
  }
  return (
    <div className="col-md-7 col-lg-8">
      <div>
        <Alert severity="error">You must be logged in to order</Alert>
        <div className="d-flex flex-row align-items-center gap-1 justify-content-center mt-3">
          <button
            type="button"
            class="  button-no-background  signin-btn"
            onClick={GoToSignIn}
          >
            Sign in
          </button>

          <p className="mb-0">or</p>
          <button
            type="button"
            class=" signup-btn button-no-background "
            onClick={GoToSignUp}
          >
            Sign Up
          </button>
          <p className="mb-0">to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInToContinue;
