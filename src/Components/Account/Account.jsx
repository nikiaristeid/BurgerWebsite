import * as React from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import "./css/Account.css";
import Navigation from "../Common/Navigation";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import CardHeader from "@mui/material/CardHeader";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import CallIcon from "@mui/icons-material/Call";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { orange } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import DisplayAddress from "./DisplayAdress";
import DisplayCoupons from "./DisplayCoupons";
import DisplayProfile from "./DisplayProfile";
import DisplayOrderHistory from "./DisplayOrderHistory";
import NavItem from "./NavItem";

export default function Account() {
  const [email, setEmail] = useState("");
  const [firstLetter, SetFirstLetter] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [userInformation, setUserInformation] = useState([]);
  const [orderHistoryActive, setOrderHistoryActive] = useState("");
  const [profileActive, setProfileActive] = useState("active");
  const [addressActive, setAddressActive] = useState("");
  const [userId, setUserId] = useState("");
  const [ordersQuantity, setOrdersQuantity] = useState(0);

  const [couponsActive, setCouponsActive] = useState("");
  const theme = useTheme();
  const [logIn, setLogIn] = useState(false);
  const color = orange[500];
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
        setUserId(uid);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  let savedCart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    let quantity = 0;
    if (savedCart) {
      savedCart.map((product) => {
        quantity += product.howmany;
      });
      setQuantity(quantity);
    }
  }, []);

  useEffect(() => {
    getUserInformation();
  }, [userId]);

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  function displayAddress() {
    setAddressActive("active");
    setOrderHistoryActive("");
    setCouponsActive("");
    setProfileActive("");
  }
  function displayProfile() {
    setAddressActive("");
    setOrderHistoryActive("");
    setCouponsActive("");
    setProfileActive("active");
  }
  function displayCoupons() {
    setAddressActive("");
    setOrderHistoryActive("");
    setCouponsActive("active");
    setProfileActive("");
  }
  function displayOrderHistory() {
    setOrderHistoryActive("active");
    setAddressActive("");
    setCouponsActive("");
    setProfileActive("");
  }

  async function getUserInformation() {
    console.log("get");
    console.log(userId);
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInformation(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <div>
      <Navigation firstLetter={firstLetter} quantity={quantity} logIn={logIn} />
      <div className="container d-flex flex-column flex-start">
        <div className="py-5  align-self-start">
          <div className="d-flex align-items-center mb-2 jusify-content-center gap-2  ">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                  {firstLetter}
                </Avatar>
              }
              title={`Hello ${email}`}
              subheader={`${ordersQuantity} orders`}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <NavItem
                onClick={displayProfile}
                active={profileActive}
                navItemTitle={"Profile"}
              />
              <NavItem
                onClick={displayAddress}
                active={addressActive}
                navItemTitle={"Address"}
              />
              <NavItem
                onClick={displayOrderHistory}
                active={orderHistoryActive}
                navItemTitle={"Order History"}
              />
              <NavItem
                onClick={displayCoupons}
                active={couponsActive}
                navItemTitle={"Coupons"}
              />
            </ul>
          </div>

          <DisplayProfile
            color={color}
            profileActive={profileActive}
            email={email}
            userInformation={userInformation}
          />
          <DisplayAddress
            userId={userId}
            getUserInformation={getUserInformation}
            userInformation={userInformation}
            addressActive={addressActive}
            color={color}
          />
          <DisplayOrderHistory
            userId={userId}
            orderHistoryActive={orderHistoryActive}
            color={color}
            setOrdersQuantity={setOrdersQuantity}
          />
          <DisplayCoupons color={color} couponsActive={couponsActive} />
        </div>
      </div>
    </div>
  );
}
