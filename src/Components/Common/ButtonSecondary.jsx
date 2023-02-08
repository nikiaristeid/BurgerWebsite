import React from "react";

export default function ButtonSecondary({ text, onClick, disabled }) {
  return (
    <button className="btn btn-secondary" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
