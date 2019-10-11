import React, { useEffect, useState } from "react";
import "./setting.css";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import Cryptr from "cryptr";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { logout } from "../../Redux/acion/LoginAction.js";

import {
  userdelete,
  changepasswordafterlogin
} from "../../Redux/acion/LoginAction.js";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const cryptr = new Cryptr("myTotalySecretKey");

const useStyles = makeStyles(theme => ({
  h2: {
    textAlign: "center",
    margin: "5px 0px"
  },
  button_passowrd_change: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 150
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  },
  root: {
    padding: theme.spacing(2, 2),
    margin: "20px 5px"
  },
  text: {
    width: "80%"
    //   margin:'auto',
  },
  p: {
    textAlign: "center"
  },
  close: {
    float: "left",
    cursor: "pointer",
    margin: "0px 0px 0px 10px",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700
  }
}));

function Setting(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [States_, setStates] = useState({
    email: "",
    oldpassword: "",
    newpassowrd: "",
    openLoginLoddingPanel: false,
    loading: false
  });
  useEffect(() => {
    console.log(props);
    if (props.authData.LoginKeyFlag !== false) {
    } else {
      props.history.replace("/home");
    }
    return () => {};
  });
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };

  function deleteUserHandle() {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Delete",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        console.log(props);
        let params = {
          data: props.authData
        };
        props.userdelete(params).then(res => {
          Swal.fire("Deleted!", "success");
          props.history.replace("/");
        });

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
  function closeStatusHandle() {
    props.history.replace("/userhome");
  }

  function chnageTextHandle(key, e) {
    setStates({ ...States_, [key]: e.target.value });
  }

  function changePasswordHandle() {
    setStates({ ...States_, openLoginLoddingPanel: true, loading: true });

    let { email, oldpassword, newpassowrd } = States_;
    let oldpassword_ = cryptr.encrypt(oldpassword);
    let newpassowrd_ = cryptr.encrypt(newpassowrd);
    let params = {
      email,
      oldpassword: oldpassword_,
      newpassowrd: newpassowrd_,
      loginKey: props.authData.LoginKey
    };
    props.changepasswordafterlogin(params).then(res => {
      console.log(res);
      if (res.msg === "change successfull") {
        setStates({
          ...States_,
          openLoginLoddingPanel: false,
          loading: false
        });
        let params = {
          loginKey: props.authData.LoginKey
        };
        props.logout(params).then(() => {
          // console.log(props)
          props.history.replace("/login");
          // props.history.replace("/home");
        });
      } else {
        Swal.fire(res.msg);
        setStates({
          ...States_,
          openLoginLoddingPanel: false,
          loading: false
        });
      }
    });
  }

  return (
    <div className="">
      <div className="close-setting">
        <p onClick={closeStatusHandle} className={classes.close}>
          X
        </p>
      </div>

      {/* <h3 className={classes.h2}>Setting</h3> */}
      <Paper className={classes.root}>
        <Typography variant="p" component="p" className={classes.p}>
          Want To Delete Account?
          <Switch checked={checked} onChange={toggleChecked} />
          {checked && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={deleteUserHandle}
            >
              Delete
            </Button>
          )}
        </Typography>
      </Paper>
      {!checked && (
        <Paper className={classes.root}>
          <Typography variant="p" className={classes.p} component="p">
            Change Passowrd
          </Typography>
          <Typography variant="p" component="p" className={classes.p}>
            <TextField
              className={classes.text}
              // id="standard-password-input"
              label="Email"
              // className={classes.textField}
              type="email"
              autoComplete="current-password"
              margin="normal"
              value={States_.email}
              onChange={e => chnageTextHandle("email", e)}
            />
          </Typography>

          <Typography variant="p" component="p" className={classes.p}>
            <TextField
              className={classes.text}
              // id="standard-password-input"
              label="Old Password"
              // className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={States_.oldpassword}
              onChange={e => chnageTextHandle("oldpassword", e)}
            />
          </Typography>

          <Typography variant="p" component="p" className={classes.p}>
            <TextField
              className={classes.text}
              // id="standard-password-input"
              label="New Passowrd"
              // className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={States_.newpassowrd}
              onChange={e => chnageTextHandle("newpassowrd", e)}
            />
          </Typography>
          <Typography variant="p" component="p" className={classes.p}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button_passowrd_change}
              onClick={changePasswordHandle}
            >
              Change Passowrd
            </Button>
          </Typography>
        </Paper>
      )}
      <Dialog
        // open={true}
        open={States_.openLoginLoddingPanel}
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
              loading={States_.loading}
              // loading={true}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    authData: state.authData.Auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userdelete: data => dispatch(userdelete(data)),
    changepasswordafterlogin: data => dispatch(changepasswordafterlogin(data)),
    logout: data => dispatch(logout(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
