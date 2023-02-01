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
    setOrderNumber();
  }, [orderNumber]);
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
        <div class="py-5 text-center d-flex flex-column align-items-center">
          <BsCheckCircleFill color="green" fontSize={80} class="mb-3" />
          <h3 class="lead">Your order was completed successfully</h3>
          <h4 class="mb-1">ORDER NO: {orderNumber}</h4>
          <p class="text-secondary">{date}</p>
        </div>

        <div class="row g-5 d-flex  align-items-center">
          <div class="col-md-10 col-lg-12 ">
            <div class="row mb-5">
              <h4 class="mb-3">Billing address</h4>
              <div class="col-12">
                <p class="mb-0">
                  {values.fname} {values.lname}
                </p>
              </div>
              <div class="col-12">
                <p class="mb-0">{values.address}</p>
              </div>
              {values.address2 !== "" && (
                <div class="col-12">
                  <p class="mb-0">
                    {values.address2}
                    <small class="text-muted">(Address 2)</small>
                  </p>
                </div>
              )}
              <div class="col-12">
                <p class="mb-0">{values.country}</p>
              </div>

              <div class="col-12">
                <p class="mb-0">{values.zip}</p>
              </div>
              {sameShipping ? (
                <div class="d-flex  align-items-center gap-1 mt-4">
                  <BsFillInfoCircleFill />
                  <p class="mb-0 ">
                    Your shipping address is the same as your billing address.
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <h4 class="mb-3">Shipping address</h4>
                  <div class="col-12">
                    <p class="mb-0">
                      {values.fnameShipping} {values.lnameShipping}
                    </p>
                  </div>
                  <div class="col-12">
                    <p class="mb-0">{values.addressShipping}</p>
                  </div>
                  {values.address2Shipping !== "" && (
                    <div class="col-12">
                      <p class="mb-0">
                        {values.address2Shipping}
                        <small class="text-muted">(Address 2)</small>
                      </p>
                    </div>
                  )}
                  <div class="col-12">
                    <p class="mb-0">{values.countryShipping}</p>
                  </div>

                  <div class="col-12">
                    <p class="mb-0">{values.zipShipping}</p>
                  </div>
                </div>
              )}
            </div>

            <div class="row mb-5">
              <h4 class="mb-3">Payment info</h4>
              {!cash ? (
                <div class=" d-flex flex-start align-items-center gap-2">
                  <img
                    width="4%"
                    src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                  />
                  <p class="mb-0">
                    <small class="text-muted">
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

                  <p class="mb-0">${total}</p>
                </div>
              ) : (
                <div class=" d-flex flex-start align-items-center gap-2 justify-content-between">
                  <p>Cash on Delivery</p>
                  <p>${total}</p>
                </div>
              )}
            </div>

            <div class="row ">
              <h4 class="mb-3">Order Details</h4>
              <ul class="list-group mb-3">
                {products.map((product) => (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class=" d-flex flex-start align-items-center">
                      <img
                        width="10%"
                        src={`${product.img}`}
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                      />
                      <div>
                        <h6 class="my-0">{product.name}</h6>
                        <small class="text-muted">{product.brief}</small>
                      </div>
                    </div>

                    <div class="d-flex flex-column">
                      <small class="text-muted">x{product.howmany}</small>
                      <span class="text-muted">${product.price}</span>
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
                <li class="list-group-item d-flex justify-content-between">
                  <span>{delivery ? "Delivery(USD)" : "Takeaway"}</span>
                  <strong>{delivery ? "$3.99" : "FREE"}</strong>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total}</strong>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary mb-4 btn-form"
            onClick={GoToLandingPage}
          >
            <BsArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
