import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Person from "@mui/icons-material/Person";
import People from "@mui/icons-material/People";
import Apartment from "@mui/icons-material/Apartment";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "./css/App.css";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { width } from "@mui/system";
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
