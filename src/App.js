import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import Account from "./Components/Account/Account";
import SignUpUser from "./SignUpUser";
import SignInUser from "./SignInUser";
import LandingPage from "./Components/LandingPage/LandingPage";
import Cart from "./Components/Cart/Cart";
import SignUp from "./SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/signinuser" element={<SignInUser />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/menu" element={<Menu />}></Route>
          <Route exact path="/account" element={<Account />}></Route>
          <Route exact path="/signupuser" element={<SignUpUser />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
