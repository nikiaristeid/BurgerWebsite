import React, { useState, useEffect } from "react";
import "./css/Landing.css";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Navigation from "../Common/Navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BsArrowRight, BsFillStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [cart, setCart] = useState([]);
  const [logIn, setLogIn] = useState(false);
  const [firstLetter, SetFirstLetter] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(0);

  let savedCart = JSON.parse(localStorage.getItem("cart"));
  let navigate = useNavigate();
  useEffect(() => {
    let quantity = 0;
    if (savedCart) {
      savedCart.map((product) => {
        quantity += product.howmany;
      });
      setCart(savedCart);
      setQuantity(quantity);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogIn(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user.email);
        setEmail(user.email);
        SetFirstLetter(user.email.charAt(0).toUpperCase());
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.vars.palette.text.tertiary,
  }));

  function navigateToPageMenu() {
    navigate("/menu");
  }

  return (
    <div>
      <Navigation
        firstLetter={firstLetter}
        quantity={quantity}
        logIn={logIn}
        setLogIn={setLogIn}
      />
      <main className="main " style={{ height: "91vh" }}>
        <div class="container-xl my-container" style={{ height: "100%" }}>
          <div
            class=" d-flex flex-row my-container2 align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <div class=" col-lg-6 col-md-7 col-sm-12  header d-flex flex-column gap-5 ">
              <div class=" flex-column align-items-start d-flex   gap-3  ">
                <h1 className="header-title  ">
                  The most delicious burgers at your door
                </h1>
                <h5 className="header-description">
                  The smart way to order your delicious burgers that will make
                  you want for more.Tailored to your personal tastes and
                  nutritional needs.
                </h5>
                <button
                  type="button"
                  class="btn button-landing d-flex flex-row align-items-center justify-content-center gap-2"
                  onClick={navigateToPageMenu}
                >
                  <p className="mb-0">Our Menu </p>
                  <BsArrowRight />
                </button>
              </div>
              <div className=" reviews d-flex  gap-1 flex-column ">
                <div className="d-flex align-items-center gap-2  steps">
                  <BsFillStarFill className="icon text-warning" />
                  <BsFillStarFill className="icon text-warning" />
                  <BsFillStarFill className="icon text-warning" />
                  <BsFillStarFill className="icon text-warning" />
                  <BsFillStarFill className="icon text-warning" />
                </div>
                <div className="text-reviews">
                  <p className="mb-0 ">
                    <strong>5 star rating</strong>
                  </p>
                  <p className="mb-0 text-secondary secondary">
                    <small>based on 2000 reviews</small>
                  </p>
                </div>
              </div>
            </div>
            <div class=" col-lg-6 col-md-5 hidden-sm image  ">
              <img
                src="https://goodys.azureedge.net/images/882x648/files/burgers/3006_Shadow_Extreme_Golden.png"
                alt=""
                className="header-image align-self-end "
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
