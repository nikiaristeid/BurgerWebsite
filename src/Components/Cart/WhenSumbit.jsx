import * as React from "react";
import "./css/Cart.css";
import {
  BsCheckCircleFill,
  BsFillInfoCircleFill,
  BsArrowLeft,
} from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function WhenSubmit({
  userId,
  date,
  values,
  sameShipping,
  cash,
  total,
  products,
  delivery,
  deliveryCost,
  code,
  discount,
  orderNumber,
  orderId,
}) {
  let navigate = useNavigate();

  function GoToLandingPage() {
    navigate("/");
  }
  useEffect(() => {
    console.log(orderNumber);
    console.log(orderId);
    setOrderNumber();
  }, [orderId]);

  async function setOrderNumber() {
    console.log("setNumber");

    try {
      await updateDoc(doc(db, "orders", orderId), {
        orderNumber: orderNumber,
      });
    } catch (e) {
      console.error("Error adding document: ");
    }
  }

  return (
    <main>
      <div className="container">
        <div className="py-5 text-center d-flex flex-column align-items-center">
          <BsCheckCircleFill color="green" fontSize={80} className="mb-3" />
          <h3 className="lead">Your order was completed successfully</h3>
          <h4 className="mb-1">ORDER NO: {orderNumber}</h4>
          <p className="text-secondary">{date}</p>
        </div>

        <div className="row g-5 d-flex  align-items-center">
          <div className="col-md-10 col-lg-12 ">
            <div className="row mb-5">
              <h4 className="mb-3">Billing address</h4>
              <div className="col-12">
                <p className="mb-0">
                  {values.fname} {values.lname}
                </p>
              </div>
              <div className="col-12">
                <p className="mb-0">{values.address}</p>
              </div>
              {values.address2 !== "" && (
                <div className="col-12">
                  <p className="mb-0">
                    {values.address2}
                    <small className="text-muted">(Address 2)</small>
                  </p>
                </div>
              )}
              <div className="col-12">
                <p className="mb-0">{values.country}</p>
              </div>

              <div className="col-12">
                <p className="mb-0">{values.zip}</p>
              </div>
              {sameShipping ? (
                <div className="d-flex  align-items-center gap-1 mt-4">
                  <BsFillInfoCircleFill />
                  <p className="mb-0 ">
                    Your shipping address is the same as your billing address.
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <h4 className="mb-3">Shipping address</h4>
                  <div className="col-12">
                    <p className="mb-0">
                      {values.fnameShipping} {values.lnameShipping}
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="mb-0">{values.addressShipping}</p>
                  </div>
                  {values.address2Shipping !== "" && (
                    <div className="col-12">
                      <p className="mb-0">
                        {values.address2Shipping}
                        <small className="text-muted">(Address 2)</small>
                      </p>
                    </div>
                  )}
                  <div className="col-12">
                    <p className="mb-0">{values.countryShipping}</p>
                  </div>

                  <div className="col-12">
                    <p className="mb-0">{values.zipShipping}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="row mb-5">
              <h4 className="mb-3">Payment info</h4>
              {!cash ? (
                <div className=" d-flex flex-start align-items-center gap-2">
                  <img
                    width="4%"
                    src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                  />
                  <p className="mb-0">
                    <small className="text-muted">
                      (
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      <VscCircleFilled color="grey" />
                      6500)
                    </small>
                  </p>

                  <p className="mb-0">${total}</p>
                </div>
              ) : (
                <div className=" d-flex flex-start align-items-center gap-2 justify-content-between">
                  <p>Cash on Delivery</p>
                  <p>${total}</p>
                </div>
              )}
            </div>

            <div className="row ">
              <h4 className="mb-3">Order Details</h4>
              <ul className="list-group mb-3">
                {products.map((product) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className=" d-flex flex-start align-items-center">
                      <img
                        width="10%"
                        src={`${product.img}`}
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                      />
                      <div>
                        <h6 className="my-0">{product.name}</h6>
                        <small className="text-muted">{product.brief}</small>
                      </div>
                    </div>

                    <div className="d-flex flex-column">
                      <small className="text-muted">x{product.howmany}</small>
                      <span className="text-muted">${product.price}</span>
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
                <li className="list-group-item d-flex justify-content-between">
                  <span>{delivery ? "Delivery(USD)" : "Takeaway"}</span>
                  <strong>{delivery ? "$3.99" : "FREE"}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total}</strong>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary mb-4 btn-form"
            onClick={GoToLandingPage}
          >
            <BsArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
