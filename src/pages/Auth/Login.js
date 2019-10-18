import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import loginicon from "../../image/loginicon.png";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Loader from '../Loader/Loader.js'
// import { FetchUtil } from "../../utilfunction/FetchUtils.js";
// import { appendQueryParams } from "../../utilfunction/UrlUtils.js";
import Swal from "sweetalert2";
import Cryptr from "cryptr";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../Redux/acion/LoginAction.js";
const cryptr = new Cryptr("myTotalySecretKey");
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(2, 2),
    height: 385,
    margin: "25px 5px",
    padding: "4px 9px",
    width: "80%",
    margin: "auto",
    marginTop: "42px"
  },
  close: {
    float: "left",
    fontSize: 22,
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 140,
    height: 43
  },
  h2: {
    margin: "5px 0px",
    textAlign: "center"
  },
  btn: {
    textAlign: "center"
  },
  text: {
    width: "100%",
    // margin: '-5px 0px',
    fontSize: '23px !important'
  },
  Dialogroot: {
    margin: "8px !important"
  }
}));

function Login(props) {
  const classes = useStyles();

  let [State, setStateValues] = useState({
    email: "",
    password: "",
    open: false,
    Error_: "",
    openLoginLoddingPanel: false,
    loading: false
  });

  useEffect(() => {
    // console.log(props.authData.LoginKey);
    if (props.authData.LoginKey.length !== 0) {
      props.history.replace("/userhome");
    }
    // if (State.open !== props.open) {
    //   setStateValues({ ...State, open: props.open });
    // }
  }, []);

  function closeLoginHandle() {
    // props.close();
    props.history.replace("/home");
  }

  function chnageTextHandle(key, e) {
    setStateValues({ ...State, [key]: e.target.value });
  }
  function goToHome() {
    props.history.replace("/userhome");
  }

  function loginHandleBtn() {
    let { email, password } = State;
    let userPassword = cryptr.encrypt(password);
    let loginKey = Math.random() * 10 + 1;
    let loginKey_ = cryptr.encrypt(loginKey);
    setStateValues({ ...State, openLoginLoddingPanel: true, loading: true });
    let params = {
      email,
      userPassword,
      loginKey_
    };
    // console.log(props)
    props.login(params).then(res => {
      // console.log(res);
      if (res.msg.msg === "Login Successfully") {
        setStateValues({
          ...State,
          openLoginLoddingPanel: false,
          loading: false
        });

        props.history.replace("/userhome");
      } else {
        setStateValues({
          ...State,
          openLoginLoddingPanel: false,
          loading: false
        });
        Swal.fire(res.msg.msg);
      }
    });
    //   console.log(res)
    // })
    // return new Promise((resolve, reject) => {
    //   console.log("abc");
    //   FetchUtil({
    //     url: appendQueryParams(`/user/login`),
    //     method: "POST",
    //     body: JSON.stringify({
    //       params
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }).then(res => {
    //     // resolve(res);
    //     console.log(res);
    //     // Swal.fire(res.msg);
    //     if (res.msg !== "Email Invalid") {
    //       console.log(res);
    //       if (res.msg !== "fail") {
    //         console.log(res);
    //         setStateValues({ ...State, Error_: "" });

    //         const person = {
    //           userName: loginKey_
    //         };
    //         window.localStorage.setItem("user", JSON.stringify(person));
    //         // props.history.replace("/");
    //         // props.history.replace("/userhome");
    //         // console.log(this.props)
    //         goToHome();

    //         // closeLoginHandle();
    //       } else {
    //         setStateValues({
    //           ...State,
    //           Error_: "Login Email Or Password Fail"
    //         });
    //       }
    //     } else {
    //       setStateValues({
    //         ...State,
    //         Error_: "Login Email Or Password Fail"
    //       });
    //     }
    //   });
    //   // .catch(err => {
    //   //   reject({ message: err });
    //   // });
    // });
  }

  return (
    // <Dialog
    //   open={State.open}
    //   className="dialogLogin"
    //   // onClose={handleClose}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    // >
    //   <DialogContent className="abc">
    <div className="" style={{ width: "100%" }}>
      <Paper className={classes.root}>
        <p onClick={closeLoginHandle} className={classes.close}>
          X
        </p>
        <div className="login-icon">
          <img src={loginicon} />
        </div>
        <h3 className={classes.h2}>Login </h3>
        <TextField
          className={`${classes.text} textbox`}
          // id="standard-password-input"
          label="Email"
          // className={classes.textField}
          type="email"
          autoComplete="current-password"
          margin="normal"
          // placeholder="example@domin.com"
          value={State.email}
          onChange={e => chnageTextHandle("email", e)}
        />
        <TextField
          className={classes.text}
          // id="standard-password-input"
          label="Password"
          // className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={State.password}
          onChange={e => chnageTextHandle("password", e)}
        />
        <p className={classes.btn}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={loginHandleBtn}
          >
            Login
          </Button>
        </p>
        <p style={{ color: "red" }}>{State.Error_}</p>
      </Paper>
      <Loader openLoaderPanel={State.openLoginLoddingPanel} openLoader={State.loading} />

      {/* <Dialog
        // open={true}
        open={State.openLoginLoddingPanel}
        // onClose={handleClose}
        className='loder-main'
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
              loading={State.loading}
              // loading={true}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
     */}
    </div>
    //   </DialogContent>
    // </Dialog>
  );
}
const mapStateToProps = state => {
  // console.log(state.educationHub.courseCategories.categories)
  return {
    authData: state.authData.Auth
    //     // getRolesData: state.rolesData.getRolesData.data,
    //     userData: state.smsData.userLogin.userData
    //     // getAddDepartmentSetupData:
    //     //   state.DepartmentSetupData.getAddDepartmentSetupData
  };
};

//mapDispatchToProps is for SetRoles
const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
