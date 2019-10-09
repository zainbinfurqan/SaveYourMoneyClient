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
import {
  userdelete,
  changepasswordafterlogin
} from "../../Redux/acion/LoginAction.js";
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
    newpassowrd: ""
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
        props.history.replace("/login");
      } else {
        Swal.fire(res.msg);
      }
    });
  }

  return (
    <div className=''>
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
    changepasswordafterlogin: data => dispatch(changepasswordafterlogin(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
