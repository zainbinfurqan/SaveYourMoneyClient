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
import WebHome from './pages/WebHome/WebHome.js'
import { connect } from "react-redux";
import WithLoginHeader from './pages/Header/WithLoginHeader.js'
import WithLogoutHeader from './pages/Header/WithlogoutHeader'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import WithlogoutHeader from "./pages/Header/WithlogoutHeader";



function App(props) {
  let [mobileView, setMobileView] = useState(false);
  let [loginCheckKey, setLoginKey] = useState('')
  useEffect(() => {
    console.log(props)
    if (props.AuthData.Auth.LoginKeyFlag === false) {
      setLoginKey({ loginCheckKey: false })
    } else {
      setLoginKey({ loginCheckKey: true })
    }
    // console.log(props)
  },[])
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
      {console.log("abs")}
      {loginCheckKey === true ? (<WithLoginHeader />) : (<WithlogoutHeader />)}
      {/* <WebHome/> */}
      {/* <Home /> */}
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

const mapStateToProps = state => {
  //   // console.log(state.educationHub.courseCategories.categories)
  return {
    AuthData: state.authData
    //     // getRolesData: state.rolesData.getRolesData.data,
    //     userData: state.smsData.userLogin.userData
    //     // getAddDepartmentSetupData:
    //     //   state.DepartmentSetupData.getAddDepartmentSetupData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // logout: data => dispatch(logout(data))
    // updateDepartments: data => dispatch(updateDepartments(data)),
    // deleteDepartments: data => dispatch(deleteDepartments(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
