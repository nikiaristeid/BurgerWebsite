import React from "react";
import ButtonSecondary from "../Common/ButtonSecondary";
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
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text" style={{ color: "#ff9800" }}>
          Your cart
        </span>
        <span
          className="badge rounded-pill"
          style={{ backgroundColor: "#ff9800" }}
        >
          {quantity}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {products.map((product) => (
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">{product.name}</h6>
              <small className="text-muted">{product.brief}</small>
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">x{product.howmany}</small>
              <span className="text-muted">${product.price}</span>
            </div>
            <div>
              <button className="button-no-background">
                <BsX onClick={() => deleteProduct(product)} />
              </button>
            </div>
          </li>
        ))}

        {code.map((code) => (
          <li className="list-group-item d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Promo code</h6>
              <small>{code.name}</small>
            </div>
            <span className="text-success">−${discount}</span>
          </li>
        ))}
        {delivery && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Delivery</span>
            <p className="mb-0">${deliveryCost}</p>
          </li>
        )}
        {takeaway && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Takeaway</span>
            <p className="mb-0">FREE</p>
          </li>
        )}
        {!delivery && !takeaway ? (
          <li className="list-group-item d-flex justify-content-between">
            <span>Shipping</span>
            <p className="mb-0">-</p>
          </li>
        ) : (
          ""
        )}

        <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>
            ${delivery ? (total + deliveryCost).toFixed(2) : total}
          </strong>
        </li>
      </ul>
      <form className="card p-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
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
            <div className="alert alert-danger" role="alert">
              The code you entered doesn't exist.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CartInformation;
