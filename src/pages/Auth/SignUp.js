import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import signup from "../../image/signup.png";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";
import Swal from "sweetalert2";
import Cryptr from "cryptr";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Loader from '../Loader/Loader.js'

// import DialogContent from "@material-ui/core/DialogContent";
// import Dialog from "@material-ui/core/Dialog";
import "./signup.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const cryptr = new Cryptr("myTotalySecretKey");

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 385,
    margin: "25px 5px",
    padding: "24px 16px",
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
  text: {
    width: "100%"
  },
  btn: {
    textAlign: "center"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  let [State, setStates] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    open: false,
    Error: "",
    openLoginLoddingPanel: false,
    loading: false
  });

  function closeSignUpHandle() {
    // props.close();
    props.history.replace("/home");
  }

  function chnageTextHandle(key, e) {
    setStates({ ...State, [key]: e.target.value });
  }

  useEffect(() => {
    // console.log(props);
    setStates({ ...State, open: props.open });
  }, []);

  function registerHandleBtn() {
    let { userName, userEmail, userPassword } = State;
    setStates({ ...State, openLoginLoddingPanel: true, loading: true });

    // function emailIsValid(userEmail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var nameFormat = /^[A-Za-z]+$/;
    if (userName.length < 3 && !userName.match(nameFormat)) {
      setStates({ ...State, Error: "name formate is invalid" });
    } else {
      if (!userEmail.match(mailformat)) {
        setStates({ ...State, Error: "email formate wrong" });
      } else {
        if (!userPassword.length > 8) {
          setStates({ ...State, Error: "password must be 8 characters" });
        } else {
          setStates({ ...State, Error: "" });
          let password = cryptr.encrypt(userPassword);
          let params = {
            userName,
            userEmail,
            password
            // loginKey_
          };
          return new Promise((resolve, reject) => {
            FetchUtil({
              url: appendQueryParams(`/user/registration`),
              method: "POST",
              body: JSON.stringify({
                params
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => {
                Swal.fire(res[0].msg);
                if (res[0].msg !== "Alreay Exist") {
                  setStates({
                    ...State,
                    openLoginLoddingPanel: false,
                    loading: false
                  });

                  setStates({ userName: "", userEmail: "", password: "" });
                  props.history.replace("/login");
                }
              })
              .catch(err => {
                reject({ message: err });
              });
          });
        }
      }
    }

    // console.log(userEmail)
    //     console.log(
    //       userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == true
    //         ? "ok"
    //         : "no"
    //     );

    // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    // }
    // let loginKey = Math.random() * 10 + 1;

    // console.log(emailIsValid());
    // // let loginKey_ = cryptr.encrypt(loginKey);
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
        <p onClick={closeSignUpHandle} className={classes.close}>
          X
        </p>
        <div className="signup-icon">
          <img src={signup} />
        </div>
        <h3 className={classes.h2}>SignUp </h3>
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="UserName"
          // className={classes.textField}
          type="email"
          value={State.userName}
          autoComplete="current-password"
          margin="normal"
          onChange={e => chnageTextHandle("userName", e)}
        />
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="Email"
          // className={classes.textField}
          type="email"
          value={State.userEmail}
          autoComplete="current-password"
          onChange={e => chnageTextHandle("userEmail", e)}
          margin="normal"
        />
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="Password"
          // className={classes.textField}
          type="password"
          autoComplete="current-password"
          onChange={e => chnageTextHandle("userPassword", e)}
          margin="normal"
          value={State.userPassword}
        />
        <p className={classes.btn}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={registerHandleBtn}
          >
            SignUp
          </Button>
        </p>
        <p>{State.Error}</p>
      </Paper>
      <Loader openLoaderPanel={State.openLoginLoddingPanel} openLoader={State.loading} />

      {/* <Dialog
        // open={true}
        open={State.openLoginLoddingPanel}
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
