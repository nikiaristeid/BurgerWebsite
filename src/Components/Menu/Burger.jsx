import React from "react";
import "./css/Menu.css";
import Alert from "@mui/material/Alert";
import ButtonSecondary from "../Common/ButtonSecondary";
const Burger = ({
  burger,
  index,
  handleIncrement,
  handleDecrement,
  removeFromCart,
  addToCart,
  addedToCart,
  idaddedToCart,
  changeAddedToCart,
}) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="bd-placeholder-img card-img-top burger-img"
          width="100%"
          height="225"
          src={`${burger.img}`}
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        />
        {addedToCart && burger.key === idaddedToCart ? (
          <Alert onClose={changeAddedToCart}>
            You added {burger.name} to your cart.
          </Alert>
        ) : (
          ""
        )}

        <div className="card-body">
          <p className="card-text">
            <strong>{burger.name}</strong>
          </p>
          <p className="card-text">{burger.description}</p>

          <div className="d-flex align-items-center justify-content-start gap-3 btn-g">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary btn-add"
              onClick={() => addToCart(burger, index)}
            >
              Add to Cart ${burger.price}
            </button>

            <div className="buttons d-flex align-content-center align-items-center gap-1 ">
              <button
                className="buttonPlusMinus buttonplusminus "
                onClick={() => handleDecrement(index)}
                disabled={burger.disabled}
              >
                -
              </button>
              {burger.count}
              <button
                className="buttonPlusMinus buttonplusminus"
                onClick={() => handleIncrement(index)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
