import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Sheet from "@mui/joy/Sheet";

import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function RadioPositionEnd() {
  const [userClick, setUserClick] = useState(false);
  const [restaurantClick, setRestaurantClick] = useState(false);

  function userClicked() {
    window.location.href = "/signinuser";
  }
  function restaurantClicked() {
    window.location.href = "/restaurantformpage";
  }

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    fontSize: 17,
  }));

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex  align-items-center justify-content-center"
    >
      <Sheet
        sx={{
          mb: 10, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right

          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div className="optionandButtons">
          <Div>{"Choose an option"}</Div>
          <Stack direction="row" spacing={3}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AccountCircleIcon />}
              onClick={userClicked}
              sx={{
                height: 80,
                px: 9,
              }}
            >
              User
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<StoreIcon />}
              onClick={restaurantClicked}
              sx={{
                height: 80,
                px: 9,
              }}
            >
              Restaurant
            </Button>
          </Stack>
        </div>
      </Sheet>
    </div>
  );
}
