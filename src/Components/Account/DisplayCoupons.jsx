import * as React from "react";

import "./css/Account.css";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function DisplayCoupons({ color, couponsActive }) {
  return (
    <div>
      {couponsActive && (
        <div className="card-body mt-3">
          <div className="d-flex gap-2 ">
            <LocalOfferIcon style={{ color: color }} />
            <h5 className="card-title mb-3">You have no coupons yet</h5>
          </div>
        </div>
      )}
    </div>
  );
}
