import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import GoogleLogin from "react-google-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
const SignInUser = () => {
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    password: Yup.string().required(),
  });
  const googleProvider = new GoogleAuthProvider();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log("login");

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
          console.log(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
          if (errorCode === "auth/wrong-password") {
            setWrongPassword(true);
          } else if (errorCode === "auth/user-not-found") {
            setUserNotFound(true);
          }
        });

      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  const onSuccess = (response) => {
    console.log("google login");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("succes");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const onFailure = (response) => {
    console.log("error");
    console.log(response);
  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(provider)
      .then((success) => {
        let user = success.user;

        const obj = {
          username: user.displayName,
          email: user.email,
          uid: user.uid,
          img: user.photoURL,
        };
        console.log(obj);
      })
      .catch((err) => err.message);
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex  align-items-center justify-content-center"
    >
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,

            mb: 5, // margin top & botom

            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              Welcome!
            </Typography>
            <button onClick={signInWithGoogle}>fefef</button>
            <Typography level="body2">Sign in to continue</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
            error={userNotFound ? true : formik.errors.email ? true : false}
            helperText={
              userNotFound
                ? "User not found"
                : formik.errors.email
                ? formik.errors.email
                : ""
            }
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value) {
                formik.setFieldError("email", null);
                setUserNotFound(false);
              }
            }}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            error={wrongPassword ? true : formik.errors.password ? true : false}
            helperText={
              wrongPassword
                ? "You entered wrong password"
                : formik.errors.password
                ? formik.errors.password
                : ""
            }
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value) {
                formik.setFieldError("password", null);
                setWrongPassword(false);
              }
            }}
          />

          <GoogleLogin
            clientId="157055178272-cb4g3uovvpftbpt2skarrt7voogtjnlh.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            sx={{ mt: 1 /* margin top */ }}
          />

          <Button sx={{ mt: 1 /* margin top */ }} onClick={formik.handleSubmit}>
            Log in
          </Button>
          <Typography
            endDecorator={<Link href="/signupuser">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Don't have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </div>
  );
};

export default SignInUser;
