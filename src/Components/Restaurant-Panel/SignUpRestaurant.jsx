import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import GoogleLogin from "react-google-login";


const SignUpRestaurant = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  function addAlertSuccess() {
    setOpen(true);
    console.log(open);
  }
  const SignupSchema = Yup.object().shape({
    name: Yup.string(),
    restaurantID: Yup.string(),
    password: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      restaurantID: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      signUp(values);
      addAlertSuccess();
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  const signUp = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        //field
        name: values.fname,
        restaurantID: values.lname,
        password: values.password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onSuccess = (response) => {
    console.log("sucess");
  };

  const onFailure = (response) => {
    console.log("error");
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex  align-items-center justify-content-center"
    >
      {open && (
        <Alert severity="success">
          Congrats-your account is now activated!
        </Alert>
      )}
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,

            mb: 4, // margin top & botom
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
            name="name"
            type="name"
            placeholder="Monastiraki"
            label="Restaurant Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name ? formik.errors.name : ""}
          />
          <TextField
            name="restaurantID"
            type="restaurantID"
            placeholder="MN1782"
            label="Restaurant ID"
            value={formik.values.restaurantID}
            onChange={formik.handleChange}
            error={formik.errors.restaurantID ? true : false}
            helperText={
              formik.errors.restaurantID ? formik.errors.restaurantID : ""
            }
          />

          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password ? formik.errors.password : ""}
          />

          <GoogleLogin
            clientId="157055178272-cb4g3uovvpftbpt2skarrt7voogtjnlh.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            sx={{ mt: 1 /* margin top */ }}
          />
          <Button sx={{ mt: 1 /* margin top */ }} onClick={formik.handleSubmit}>
            Sign up
          </Button>
        </Sheet>
      </CssVarsProvider>
    </div>
  );
};

export default SignUpRestaurant;
