import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import GoogleLogin from "react-google-login";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const SignUpUser = () => {
  const [open, setOpen] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  let navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    password: Yup.string()
      .min(5, " Password should be at least 6 characters")
      .max(30, "Too Long!")
      .required(),
  });
  const provider = new GoogleAuthProvider();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      //console.log(values.email);
      //createUserWithEmailAndPassword(values.email, values.password);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("success");
          addAlertSuccess();
          navigate("/signinuser");

          // ...
        })
        .catch((error) => {
          console.error(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
          if (errorCode === "auth/email-already-in-use") {
            setEmailUsed(true);
          }
        });

      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  function addAlertSuccess() {
    setOpen(true);
    console.log(open);
  }

  const onSuccess = (response) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const onFailure = (response) => {
    console.log(response);
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
              Sign up
            </Typography>
            <Typography level="body2">The process is easy and fast.</Typography>
          </div>

          <TextField
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            label="Email"
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value) {
                formik.setFieldError("email", null);
                setEmailUsed(false);
              }
            }}
            value={formik.values.email}
            error={emailUsed ? true : formik.errors.email ? true : false}
            helperText={
              emailUsed
                ? "The email is already used"
                : formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value) {
                formik.setFieldError("password", null);
              }
            }}
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password ? formik.errors.password : ""}
          />

          {/*<GoogleLogin
            clientId="157055178272-cb4g3uovvpftbpt2skarrt7voogtjnlh.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            sx={{ mt: 1  }}
          />*/}
          <Button sx={{ mt: 1 /* margin top */ }} onClick={formik.handleSubmit}>
            Sign up
          </Button>
        </Sheet>
      </CssVarsProvider>
    </div>
  );
};

export default SignUpUser;
