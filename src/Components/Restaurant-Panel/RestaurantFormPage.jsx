import { useFormik } from "formik";
import * as Yup from "yup";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import GoogleLogin from "react-google-login";
import { Alert } from "@mui/material";
import { collection, query, where } from "firebase/firestore";

const RestaurantFormPage = () => {
  const [wrongRestaurantID, setWrongRestaurantID] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const SignupSchema = Yup.object().shape({
    restaurantID: Yup.string(),
    password: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      restaurantID: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("login");
      signIn(values);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  async function signIn(values) {
    console.log("signin");
    const q = query(
      collection(db, "restaurants"),
      where("restaurantID", "==", values.restaurantID)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    if (querySnapshot.empty) {
      console.log("You entered wrong id");
      setWrongRestaurantID(true);
    } else {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        if (values.password === doc.data().password) {
          console.log("password is ok, sign in");
        } else {
          console.log("You entered wrong password");
          setWrongPassword(true);
        }
      });
    }
  }

  const onSuccess = (response) => {
    console.log("sucess");
  };

  const onFailure = (response) => {
    console.log("error");
  };

  return (
    <div>
      {wrongRestaurantID && (
        <Alert severity="error">
          You entered wrong RestaurantID — check it out!
        </Alert>
      )}
      {wrongPassword && (
        <Alert severity="error">
          You entered wrong password — check it out!
        </Alert>
      )}
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
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
            <Typography level="body2">Sign in to continue</Typography>
          </div>
          <TextField
            // html input attribute
            name="restaurantID"
            type="restaurantID"
            placeholder="MN1788"
            // pass down to FormLabel as children
            label="RestaurantID"
            error={formik.errors.restaurantID ? true : false}
            helperText={
              formik.errors.restaurantID ? formik.errors.restaurantID : ""
            }
            value={formik.values.restaurantID}
            onChange={formik.handleChange}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password ? formik.errors.password : ""}
            value={formik.values.password}
            onChange={formik.handleChange}
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
            endDecorator={<Link href="/signuprestaurant">Sign up</Link>}
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

export default RestaurantFormPage;
