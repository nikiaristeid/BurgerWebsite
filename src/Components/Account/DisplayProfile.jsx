import * as React from "react";
import "./css/Account.css";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import CallIcon from "@mui/icons-material/Call";

export default function DisplayProfile({
  color,
  profileActive,
  userInformation,
  email,
}) {
  return (
    <div>
      {profileActive && (
        <div className="card-body p-4 mt-3">
          <h5 className="card-title mb-3">
            {userInformation.fname} {userInformation.lname}
          </h5>
          <div className="d-flex flex-column gap-4 ">
            <div className="d-flex align-items-center gap-2 ">
              <MarkunreadIcon style={{ color: color }} />
              <p className="card-text">{email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
