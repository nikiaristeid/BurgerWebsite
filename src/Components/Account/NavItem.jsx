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

export default function NavItem({ navItemTitle, onClick, active }) {
  return (
    <li className="nav-item">
      <button
        className={`nav-link ${active} `}
        onClick={onClick}
        style={{ color: "black" }}
      >
        {navItemTitle}
      </button>
    </li>
  );
}
