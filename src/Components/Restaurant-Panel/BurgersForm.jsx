import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertTitle,
  IconButton,
  Alert,
  Typography,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormControl,
  ButtonGroup,
} from "@mui/material";

const BurgersForm = () => {
  const restaurants = ["Galatsi", "Goudi"];
  const [submit, setSubmit] = useState();
  const [position, setPosition] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(restaurants[1]);

  const SignupSchema = Yup.object().shape({
    burger: Yup.string().min(3, "Too Short!").required("Required"),
    price: Yup.number()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    ingredients: Yup.array().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      burger: "",
      price: "",
      ingredients: [],
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("submited");
      alert(JSON.stringify(values, null, 2));
      addBurger(values);
    },
  });

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  function removeAlertSuccess() {
    setOpen(false);
    console.log(open);
  }

  function addAlertSuccess() {
    setOpen(true);
    console.log(open);
  }
  function clearInputs() {
    // clear the form fields
    formik.setFieldValue("burger", "");
    formik.setFieldValue("price", "");

    let pinakas = [];
    for (let i = 0; i <= position; i++) {
      console.log("niki");
      pinakas.push("gg");
    }
    console.log(pinakas);
    //formik.setFieldValue("ingredients", pinakas);
    //setPosition(1);
  }

  const addBurger = async (values) => {
    try {
      setSubmit(false);
      const docRef = await addDoc(collection(db, "burgers"), {
        //field
        name: values.burger,
        price: values.price,
        ingredients: values.ingredients,
      });
      console.log("Document written with ID: ", docRef.id);
      addAlertSuccess();
      console.log(submit);
      clearInputs();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function addIngredient() {
    setPosition(position + 1);
    console.log(position);
  }

  return (
    <main
      style={{ height: "100vh" }}
      className="d-flex  align-items-center justify-content-center"
    >
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex   gap-3 flex-column">
            <Typography variant="h4">Burgers Form</Typography>

            <div>
              <TextField
                onClick={removeAlertSuccess}
                required
                id="outlined-basic"
                name="burger"
                label="Add Burger"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.burger}
                error={formik.errors.burger ? true : false}
                helperText={formik.errors.burger ? formik.errors.burger : ""}
                sx={{ width: "40ch" }}
              />
            </div>
            <div>
              <FormControl
                required
                fullWidth
                id="outlined-size-small"
                sx={{ width: "40ch" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  onClick={removeAlertSuccess}
                  error={formik.errors.price ? true : false}
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Price"
                />
                {formik.errors.price ? (
                  <FormHelperText id="component-error-text">
                    Error
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </div>

            <div>
              <Stack spacing={1} direction="column">
                {Array.from({ length: position })
                  .fill(0)
                  .map((i, index) => {
                    return (
                      <Stack spacing={0.2} direction="row">
                        <TextField
                          name={`ingredients[${index}]`}
                          onChange={formik.handleChange}
                          value={formik.values.ingredients[index]}
                          id="outlined-basic"
                          label="Add Ingredient"
                          variant="outlined"
                          required
                          sx={{ width: "40ch" }}
                          onClick={removeAlertSuccess}
                        />
                        {index !== 0 && (
                          <IconButton
                            color="primary"
                            component="label"
                            onClick={() => setPosition(position - 1)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}

                        {index == 0 && (
                          <IconButton
                            color="primary"
                            component="label"
                            onClick={addIngredient}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Stack>
                    );
                  })}
              </Stack>
            </div>
            <div>
              {open && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  The Burger Information were submitted successfully!
                </Alert>
              )}
            </div>
            <Stack>
              <ButtonGroup size="small" aria-label="small button group">
                <Button type="submit" variant="contained" size="large">
                  Submit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  onClick={clearInputs}
                >
                  Clear
                </Button>
              </ButtonGroup>
            </Stack>
          </div>
        </form>
      </section>
    </main>
  );
};

export default BurgersForm;
