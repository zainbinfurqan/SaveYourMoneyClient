import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../Redux/acion/LoginAction.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import "./header.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function Header(props) {
  let [loginFlag, setFlag] = useState(false);
  let [open, setOpen] = useState(false);
  let [Stats_, setState_] = useState({
    openLoginLoddingPanel: false,
    loading: false
  });

  useEffect(() => {
    console.log(window.innerWidth);
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      if (window.innerWidth > 768) {
        setOpen((open = true));
      } else {
        setOpen((open = false));
      }
    });

    if (props.AuthData.Auth.LoginKey !== "") {
      setFlag((loginFlag = true));
    } else {
      // console.log("ok");
      setFlag((loginFlag = false));
    }
  });

  function logoutHandle() {
    setState_({ ...Stats_, openLoginLoddingPanel: true, loading: true });

    let params = {
      loginKey: props.AuthData.Auth.LoginKey
    };
    props.logout(params).then(() => {
      // console.log(props)
      logoutRout();
      // props.history.replace("/home");
    });
  }
  function logoutRout() {
    console.log(props);
    setState_({ ...Stats_, openLoginLoddingPanel: false, loading: false });

    // props.history.replace("/home");
  }

  return (
    <div className="row header_main">
      {/* {console.log(loginFlag)} */}
      <div className="header">
        {loginFlag && (
          <div>
            {/* <p onClick={logoutHandle} className="logout-btn">
            LogOut
          </p> */}
            <button type="button" class="btn logout-btn" onClick={logoutHandle}>
              LogOut
            </button>
            <p className="wellcome-text">Welcome</p>
          </div>
        )}
        {!loginFlag && <p className="header-Title">SaveMoney</p>}
      </div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This web app is currently only for mobile/table view
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        // open={true}
        open={Stats_.openLoginLoddingPanel}
        // onClose={handleClose}
        className="loder-main"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={Stats_.loading}
              // loading={true}
            />
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
    logout: data => dispatch(logout(data))
    // updateDepartments: data => dispatch(updateDepartments(data)),
    // deleteDepartments: data => dispatch(deleteDepartments(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
