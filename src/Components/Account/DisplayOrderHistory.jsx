import * as React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import "./css/Account.css";
import { useState, useEffect } from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Badge from "@mui/material/Badge";

export default function DisplayOrderHistory({
  userId,
  orderHistoryActive,
  color,
  setOrdersQuantity,
}) {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    (async () => {
      if (orderHistoryActive == "active") {
        await displayOrdersFirebase();
      }
    })();
  }, [orderHistoryActive]);

  useEffect(() => {
    console.log(orderHistory);
  }, [orderHistory]);

  async function displayOrdersFirebase() {
    console.log("gg");
    let order = [];
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      order.push(doc.data());
    });
    console.log(order);
    setOrdersQuantity(order.length);
    setOrderHistory(order);
  }

  return (
    <div>
      {orderHistoryActive && (
        <div className="card-body mt-3">
          {orderHistory.map((order) => (
            <div>
              <button
                type="button"
                className="list-group-item list-group-item-action "
              >
                <div className="row ">
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex  align-items-center justify-content-between">
                      <div className=" d-flex flex-start align-items-center">
                        <div>
                          <h6 className="my-0">
                            Order number {order.orderNumber}
                          </h6>
                          <small className="text-muted"></small>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <small className="text-muted">{order.date}</small>
                      </div>

                      <div className="d-flex flex-column">
                        <small className="text-muted"></small>
                        <span className="text-muted">${order.total}</span>
                      </div>

                      <Badge badgeContent={order.quantity} color="success">
                        <LunchDiningIcon
                          className="burger-icon"
                          style={{ color: color }}
                        />
                      </Badge>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
