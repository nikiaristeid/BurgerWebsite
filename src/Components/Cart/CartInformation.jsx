import React from "react";
import ButtonSecondary from "../Common/ButtonSecondary";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import "./css/Cart.css";

const CartInformation = ({
  deleteProduct,
  quantity,
  products,
  delivery,
  takeaway,
  redeemCode,
  deliveryCost,
  values,
  handleChange,
  codeActive,
  code,
  codeDontExist,
  total,
  discount,
}) => {
  return (
    <div class="col-md-5 col-lg-4 order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text" style={{ color: "#ff9800" }}>
          Your cart
        </span>
        <span class="badge rounded-pill" style={{ backgroundColor: "#ff9800" }}>
          {quantity}
        </span>
      </h4>
      <ul class="list-group mb-3">
        {products.map((product) => (
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">{product.name}</h6>
              <small class="text-muted">{product.brief}</small>
            </div>
            <div class="d-flex flex-column">
              <small class="text-muted">x{product.howmany}</small>
              <span class="text-muted">${product.price}</span>
            </div>
            <div>
              <button className="button-no-background">
                <BsX onClick={() => deleteProduct(product)} />
              </button>
            </div>
          </li>
        ))}

        {code.map((code) => (
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>{code.name}</small>
            </div>
            <span class="text-success">−${discount}</span>
          </li>
        ))}
        {delivery && (
          <li class="list-group-item d-flex justify-content-between">
            <span>Delivery</span>
            <p class="mb-0">${deliveryCost}</p>
          </li>
        )}
        {takeaway && (
          <li class="list-group-item d-flex justify-content-between">
            <span>Takeaway</span>
            <p class="mb-0">FREE</p>
          </li>
        )}
        {!delivery && !takeaway ? (
          <li class="list-group-item d-flex justify-content-between">
            <span>Shipping</span>
            <p class="mb-0">-</p>
          </li>
        ) : (
          ""
        )}

        <li class="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>
            ${delivery ? (total + deliveryCost).toFixed(2) : total}
          </strong>
        </li>
      </ul>
      <form class="card p-2">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Promo code"
            onChange={handleChange}
            value={values.code}
            name="code"
            disabled={codeActive}
          />

          <ButtonSecondary
            text={"Redeem"}
            onClick={redeemCode}
            disabled={codeActive}
          />
          {codeDontExist && (
            <div class="alert alert-danger" role="alert">
              The code you entered doesn't exist.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CartInformation;
