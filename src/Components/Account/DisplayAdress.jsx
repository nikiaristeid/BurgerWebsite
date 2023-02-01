import * as React from "react";
import { db } from "../../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import "./css/Account.css";
import { BsFillHouseFill } from "react-icons/bs";

export default function DisplayAddress({
  userId,
  userInformation,
  getUserInformation,
  addressActive,
  color,
}) {
  async function deleteAddress() {
    console.log("deleteAdrres");
    const cityRef = doc(db, "users", userId);
    await updateDoc(cityRef, {
      address: deleteField(),
      country: deleteField(),
      zip: deleteField(),
    });
    console.log(userInformation);
    getUserInformation();
  }

  return (
    <div>
      {addressActive && (
        <div className="card-body mt-3">
          <div className="list-group">
            {userInformation.address && (
              <div className="list-group-item  ">
                <div className="d-flex justify-content-between  align-items-center">
                  <div className="d-flex gap-3 jusify-content-center  align-items-center">
                    <BsFillHouseFill
                      className="icon-home"
                      style={{ color: color }}
                    />
                    <div>
                      <p className="mb-0">{userInformation.address}</p>
                      <p className="mb-0">{userInformation.country}</p>
                      <p className="mb-0">{userInformation.zip}</p>
                    </div>
                  </div>
                  <div className="  jusify-content-center  align-items-center">
                    <button
                      type="button"
                      className="btn text-danger button-no-background delete-btn"
                      onClick={deleteAddress}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
