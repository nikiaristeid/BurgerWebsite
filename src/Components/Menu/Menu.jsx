import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { query, where } from "firebase/firestore";
import "./css/Menu.css";
import Chip from "@mui/material/Chip";
import Navigation from "../Common/Navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ScrollUp from "../Common/ScrollUp";
import Burger from "./Burger";

const Menu = () => {
  const [burgers, setBurgers] = useState([]);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [idaddedToCart, setidAddedToCart] = useState("");
  const [firstLetter, SetFirstLetter] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [logIn, setLogIn] = useState(false);

  let savedCart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    let quantity = 0;
    if (savedCart) {
      savedCart.map((product) => {
        quantity += product.howmany;
      });
      setQuantity(quantity);
      setCart(savedCart);
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

  useEffect(() => {
    getBurgers();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  async function getBurgers() {
    const q = query(collection(db, "Burgers"));
    const querySnapshot = await getDocs(q);
    const newBurger = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      newBurger.push({ ...data, count: 1, disabled: true, howmany: 0 });
      setBurgers(newBurger);
      console.log(newBurger);
    });
  }

  const addToCart = (product, index) => {
    const newBurgers = [...burgers];
    let productFound = false;
    let copyCart = [...cart];
    setAddedToCart(true);
    setidAddedToCart(product.key);
    for (let i = 0; i < cart.length; i++) {
      if (product.key === cart[i].key) {
        // yparxi idi o kodikos sto kalathi
        cart[i].howmany += product.count;
        productFound = true;
      }
    }
    if (!productFound) {
      copyCart.push({ ...product, howmany: product.count });
    }
    setQuantity(product.count + quantity);
    newBurgers[index].count = 1;
    console.log(product.key);
    console.log(product);
    console.log(copyCart);
    console.log(quantity);
    setCart(copyCart);

    localStorage.setItem("cart", JSON.stringify(copyCart));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  function handleIncrement(index) {
    const newBurgers = [...burgers];
    newBurgers[index].count += 1;
    if (burgers[index].count > 1) {
      newBurgers[index].disabled = false;
    }
    setBurgers(newBurgers);
  }

  function handleDecrement(index) {
    const newBurgers = [...burgers];
    if (burgers[index].count > 1) {
      newBurgers[index].count -= 1;
      setBurgers(newBurgers);
    }

    if (burgers[index].count <= 1) {
      newBurgers[index].disabled = true;
      setBurgers(newBurgers);
    }
  }

  function changeAddedToCart() {
    setAddedToCart(false);
  }
  return (
    <div>
      <Navigation firstLetter={firstLetter} quantity={quantity} logIn={logIn} />
      <main>
        <section className="py-3 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Burgers</h1>
              <p className="lead text-muted">
                The most famous burger, at your door!
              </p>

              <p className="d-flex align-items-center gap-2 justify-content-center">
                <Chip
                  label="Delivery: 3.99$"
                  size="large"
                  style={{ backgroundColor: "#ff6d00", color: "#fafafa" }}
                />
                <Chip
                  label="Minimun Order: 6$"
                  color="primary"
                  variant="outlined"
                  size="large"
                  style={{ borderColor: "#ff6d00", color: "#ff6d00" }}
                />
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {burgers.map((burger, index) => (
                <Burger
                  burger={burger}
                  index={index}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  addedToCart={addedToCart}
                  idaddedToCart={idaddedToCart}
                  changeAddedToCart={changeAddedToCart}
                />
              ))}
            </div>
          </div>
        </div>
        <ScrollUp />
      </main>
    </div>
  );
};

export default Menu;
