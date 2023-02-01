import React from "react";
import { BsClock } from "react-icons/bs";
import { useState } from "react";
const BillingForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  deliveryCost,
  setSameShipping,
  chooseDelivery,
  chooseTakeaway,
  deliveryClass,
  takeawayClass,
  handlePayment,
  checkedCard,
  checkedCash,
}) => {
  const [sameShippingChild, setSameShippingChild] = useState(true);
  function handleSameShipping(event) {
    console.log(event);
    setSameShippingChild(event.target.checked);
    setSameShipping(event.target.checked);
  }
  return (
    <div className="col-md-7 col-lg-8">
      <h4 className="mb-3">Billing address</h4>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row g-3">
          <div className="col-sm-6">
            <label for="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              required
              placeholder=""
              onChange={handleChange}
              value={values.fname}
              className={`form-control ${errors.fname && "is-invalid"}`}
            />
            <div className="invalid-feedback">{errors.fname}</div>
          </div>
          <div className="col-sm-6">
            <label for="lastName" className="form-label">
              Last name
            </label>
            <input
              name="lname"
              type="text"
              className={`form-control ${errors.lname && "is-invalid"}`}
              id="lname"
              placeholder=""
              required
              onChange={handleChange}
              value={values.lname}
              error={errors.lname ? true : false}
            />
            <div className="invalid-feedback">{errors.lname}</div>
          </div>

          <div className="col-12">
            <label for="address" className="form-label">
              Address
            </label>
            <input
              name="address"
              type="text"
              className={`form-control ${errors.address && "is-invalid"}`}
              id="address"
              placeholder="1234 Main St"
              required
              onChange={handleChange}
              value={values.address}
              error={errors.address ? true : false}
            />
            <div className="invalid-feedback">{errors.address}</div>
          </div>

          <div className="col-12">
            <label for="address2" className="form-label">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              name="address2"
              type="text"
              className={`form-control ${errors.address2 && "is-invalid"}`}
              id="address2"
              placeholder="Apartment or suite"
              onChange={handleChange}
              value={values.address2}
              error={errors.address2 ? true : false}
            />
          </div>
          <div className="col-md-5">
            <label for="country" className="form-label">
              Country
            </label>
            <select
              name="country"
              className={`form-select ${errors.country && "is-invalid"}`}
              onChange={handleChange}
              value={values.country}
            >
              <option>Choose a country</option>
              <option value="United States">United States</option>
              <option value="Greece">Greece</option>
              <option value="Italy">Italy</option>
            </select>
            <div className="invalid-feedback">{errors.country}</div>
          </div>

          <div className="col-md-3">
            <label for="zip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className={`form-control ${errors.zip && "is-invalid"}`}
              id="zip"
              name="zip"
              placeholder=""
              required
              onChange={handleChange}
              value={values.zip}
            />

            <div className="invalid-feedback">Zip code required.</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="form-check  d-flex align-items-center gap-2  ">
            <input
              type="checkbox"
              className="form-check-input"
              id="same-address"
              checked={sameShippingChild}
              onChange={handleSameShipping}
            />
            <label className="form-check-label" for="same-address">
              Shipping address is the same as my billing address
            </label>
          </div>
          {!sameShippingChild && (
            <div className="row g-3 mt-3">
              <h4 className="">Shipping address</h4>
              <div className="col-sm-6">
                <label for="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  name="fnameShipping"
                  className={`form-control ${
                    errors.fnameShipping && "is-invalid"
                  }`}
                  id="fnameShipping"
                  required
                  placeholder=""
                  onChange={handleChange}
                  value={values.fnameShipping}
                />
                <div className="invalid-feedback">{errors.fnameShipping}</div>
              </div>
              <div className="col-sm-6">
                <label for="lastName" className="form-label">
                  Last name
                </label>
                <input
                  name="lnameShipping"
                  type="text"
                  className={`form-control ${
                    errors.lnameShipping && "is-invalid"
                  }`}
                  id="lnameShipping"
                  placeholder=""
                  required
                  onChange={handleChange}
                  value={values.lnameShipping}
                  error={errors.lnameShipping ? true : false}
                />
                <div className="invalid-feedback">{errors.lnameShipping}</div>
              </div>

              <div className="col-12">
                <label for="address" className="form-label">
                  Address
                </label>
                <input
                  name="addressShipping"
                  type="text"
                  className={`form-control ${
                    errors.addressShipping && "is-invalid"
                  }`}
                  id="addressShipping"
                  placeholder="1234 Main St"
                  required
                  onChange={handleChange}
                  value={values.addressShipping}
                />
                <div className="invalid-feedback">{errors.addressShipping}</div>
              </div>

              <div className="col-12">
                <label for="address2" className="form-label">
                  Address 2<span className="text-muted">(Optional)</span>
                </label>
                <input
                  name="address2Shipping"
                  type="text"
                  className={`form-control ${
                    errors.address2Shipping && "is-invalid"
                  }`}
                  id="address2Shipping"
                  placeholder="Apartment or suite"
                  onChange={handleChange}
                  value={values.address2Shipping}
                />
              </div>
              <div className="col-md-5">
                <label for="country" className="form-label">
                  Country
                </label>
                <select
                  name="countryShipping"
                  className={`form-select ${
                    errors.countryShipping && "is-invalid"
                  }`}
                  onChange={handleChange}
                  value={values.countryShipping}
                >
                  <option value="United States">United States</option>
                  <option value="Greece">Greece</option>
                  <option value="Italy">Italy</option>
                </select>
                <div className="invalid-feedback">Please select a country.</div>
              </div>

              <div className="col-md-3">
                <label for="zipShipping" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.zipShipping && "is-invalid"
                  }`}
                  id="zipShipping"
                  placeholder=""
                  required
                  onChange={handleChange}
                  value={values.zipShipping}
                />
                <div className="invalid-feedback">{errors.zipShipping}</div>
              </div>
            </div>
          )}
        </div>

        <hr className="my-4" />
        <div className={`${errors.fname && "is-invalid"}`}>
          <h4 className="mb-3">Shipping</h4>

          <ul className={`list-group mb-3 ${errors.fname && "is-invalid"}`}>
            <li
              className={`list-group-item d-flex justify-content-between lh-sm shipping ${deliveryClass}  ${
                errors.fname && "invalid"
              }`}
              onClick={chooseDelivery}
            >
              <div>
                <h6 className="my-0">Delivery</h6>
                <small className="text-muted d-flex align-items-center gap-1">
                  <BsClock />
                  20'
                </small>
              </div>
              <div className="d-flex flex-column">
                <small className="text-muted"></small>
                <span className="text-muted">${deliveryCost}</span>
              </div>
            </li>

            <li
              className={`list-group-item d-flex justify-content-between lh-sm shipping ${takeawayClass} ${
                errors.delivery && "invalid"
              }  `}
              onClick={chooseTakeaway}
            >
              <div>
                <h6 className="my-0">Takeaway</h6>
                <small className="text-muted d-flex align-items-center gap-1">
                  <BsClock />
                  10'
                </small>
              </div>
              <div className="d-flex flex-column ">
                <span className="text-muted align-self-end">FREE</span>
                <small>
                  <a className="link-info">Pick a store</a>
                </small>
              </div>
            </li>
          </ul>
          <div className="invalid-feedback">{errors.delivery}</div>
        </div>
        <hr className="my-4" />
        <div>
          <h4 className="mb-3">Payment</h4>
          <div className="my-3">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                id="card"
                name="paymentMethodCard"
                value="card"
                type="checkbox"
                className={`form-check-input `}
                checked={checkedCard}
                onChange={() => handlePayment("card")}
              />
              <label className="form-check-label" for="credit">
                Credit card
              </label>
            </div>

            <div className="form-check d-flex align-items-center gap-2">
              <input
                id="cash"
                value="cash"
                name="paymentMethodCash"
                type="checkbox"
                className={`form-check-input `}
                required
                checked={checkedCash}
                onChange={() => handlePayment("cash")}
              />
              <label className="form-check-label" for="paypal">
                Cash on Delivery
              </label>
            </div>
          </div>
          {checkedCard && (
            <div className="row gy-3">
              <div className="col-md-6">
                <label for="cc-name" className="form-label">
                  Name on card
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>

              <div className="col-md-6">
                <label for="cc-number" className="form-label">
                  Credit card number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div className="col-md-3">
                <label for="cc-expiration" className="form-label">
                  Expiration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3">
                <label for="cc-cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
          )}
        </div>
        <hr className="my-4" />

        <button
          className="w-100 btn btn-primary btn-lg mb-5 btn-form"
          type="submit"
        >
          Continue to checkout
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
