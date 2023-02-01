import * as React from "react";
import "./css/Cart.css";
import ButtonSecondary from "../Common/ButtonSecondary";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function EmptyCart() {
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2 className="mb-0">Empty Cart</h2>

          <p className="lead">Looks like your cart is empty</p>
        </div>
        <div className="text-center ">
          <img
            className="ml-3 imageEmptyCart"
            src="https://cdn-icons-png.flaticon.com/512/2037/2037021.png"
            alt="Generic placeholder image"
          />
        </div>
      </main>
    </div>
  );
}
