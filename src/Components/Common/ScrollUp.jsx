import Fab from "@mui/material/Fab";
import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollUp() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      window.pageYOffset > 10 ? setShowButton(true) : setShowButton(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {showButton && (
        <div className="{`scrollToTop`}">
          <Fab
            className={"position-fixed bottom-0 end-0 m-3"}
            size="medium"
            color="primary"
            aria-label="add"
            onClick={handleScrollToTop}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      )}
    </>
  );
}
