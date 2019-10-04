import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/Home.js";
import UserHome from "./pages/user/UserHome.js";
import AddExpensive from "./pages/Expensive/AddExpensive.js";
import Login from "./pages/Auth/Login.js";
import SignUp from "./pages/Auth/SignUp.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DefaultLayout from './Default/DefaultLayout.js'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";



function App() {
  let [mobileView, setMobileView] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     console.log(window.innerWidth);
  //     if (window.innerWidth >= 426) {
  //       setMobileView((mobileView = true));
  //     } else {
  //       setMobileView((mobileView = false));
  //     }
      
  //   });
  // });

  return (
    <div className="App">
      <Home />
      <Dialog
        open={mobileView}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>This Web App Only For Mobile View</h2>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
