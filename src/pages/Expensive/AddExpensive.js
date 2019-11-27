import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./addexpensive.css";
import { connect } from "react-redux";
import { addexpendature } from "../../Redux/acion/ExpendatureAction.js";
import Swal from "sweetalert2";
import Select from "react-select";
import Loader from '../Loader/Loader.js'
import Header from '../Header/Header'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const options = [
  { value: "other", label: "other" },
  { value: 1, label: "Food" },
  { value: 2, label: "Car Service" },
  { value: 3, label: "Bike Service" },
  { value: 4, label: "Fuel" },
  { value: 5, label: "School Fee" },
  { value: 6, label: "Tuition Fee" },
  { value: 7, label: "Kamety" },
  { value: 8, label: "Bike Wash" },
  { value: 9, label: "Car Wash" },
  { value: 10, label: "House Rent" },
  { value: 11, label: "Home glosry" },
  { value: 12, label: "Jym" }
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    // margin: "25px 5px",
    height: 385,
    width: "85%",
    margin: "auto",
    marginTop: "30px"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  },
  formtext: {
    margin: "10px 0px"
    // float: 'left',
    // width: 'fit-content',
  },
  h2: {
    margin: "0px 0px 50px 0px",
    textAlign: "center"
  },
  close: {
    float: "left",
    // cursor: "pointer",
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer"
  },
  // h2: {
  // },
  selectroot: {
    // width: "100%",
    // height: 33,
    // borderColor: "#bfa0dc",
    // fontSize: 15,
    // fontWeight: 600
  },
  text: {
    width: "100%"
  },
  btn: {
    textAlign: "center"
  }
}));
function AddExpensive(props) {
  const classes = useStyles();
  const [State_, setStateValues] = React.useState({
    selectOption: [],
    Money: "",
    expendatureName: "",
    otherExpendatureFalg: false,
    Error: "",
    openLoginLoddingPanel: false,
    loading: false
  });

  useEffect(() => {
    console.log(props);
    if (props.AuthData.Auth.LoginKeyFlag !== false) {
      // setFlag((loginFlag = true));
    } else {
      // console.log("ok");
      // setFlag((loginFlag = false));
      props.history.replace("/home");
    }
    return () => {
      // console.log(props);
    };
  });

  function expensiveChangeHandle(key, e) {
    // console.log(key, e.target.value);
    if (e.value === "other") {
      setStateValues({
        ...State_,
        otherExpendatureFalg: true,
        [key]: e
      });
    } else {
      setStateValues({
        ...State_,
        [key]: e,
        otherExpendatureFalg: false
      });
    }
  }
  function clossAddExpendature() {
    props.history.replace("/userhome");
  }

  function changeTextHandle(key, e) {
    setStateValues({ ...State_, [key]: e.target.value });
  }

  function submitExpendatureBtn() {
    var nameFormat = /[a-zA-Z]+\s*[a-zA-Z]+\s*[a-zA-Z]+/;
    var moneyFormat = /^[1-9][0.0-9]+$/;
    let { selectOption, Money, expendatureName } = State_;
    if (selectOption.value == "other") {
      console.log(" other");

      if (!expendatureName.match(nameFormat)) {
        setStateValues({
          ...State_,
          Error: "expendature name formate is invalide"
        });
      } else {
        if (expendatureName.length < 3) {
          console.log("name");
          setStateValues({
            ...State_,
            Error: "expendature name formate is invalide"
          });
        } else {
          if (!Money.match(moneyFormat)) {
            setStateValues({
              ...State_,
              Error: "Moeny formate invalid"
            });
          } else {
            if (Money.length > 6) {
              setStateValues({
                ...State_,
                Error: "Moeny formate invalid"
              });
            } else {
              setStateValues({
                ...State_,
                Error: ""
              });

              let expendatureName_ = expendatureName.trim();
              let params = {
                selectOption,
                Money,
                expendatureName: expendatureName_,
                loginKey: props.AuthData.Auth.LoginKey,
                Email: props.AuthData.Auth.Email
              };
              add(params);
            }
          }
        }
      }
    } else {
      console.log("no other");
      if (!Money.match(moneyFormat)) {
        setStateValues({
          ...State_,
          Error: "Moeny formate invalid"
        });
      } else {
        if (Money.length > 6) {
          setStateValues({
            ...State_,
            Error: "Moeny formate invalid"
          });
        } else {
          if (selectOption.length === 0) {
            setStateValues({
              ...State_,
              Error: "select expendature"
            });
          } else {
            setStateValues({
              ...State_,
              Error: ""
            });

            let params = {
              selectOption,
              Money,
              expendatureName,
              loginKey: props.AuthData.Auth.LoginKey,
              Email: props.AuthData.Auth.Email
            };
            add(params);
          }
        }
      }
    }
    //-----------------
    //
    //
    //-----------------
  }
  function add(params) {
    setStateValues({
      ...State_,
      openLoginLoddingPanel: true,
      loading: true
    });
    props.addexpendature(params).then(res => {
      // console.log(res);
      if (res[0].msg === "insert Successfully") {
        Swal.fire(res[0].msg);

        setStateValues({
          selectOption: "",
          Money: "",
          expendatureName: "",
          otherExpendatureFalg: false,
          openLoginLoddingPanel: false,
          loading: false
        });
      } else {
        setStateValues({
          selectOption: "",
          Money: "",
          expendatureName: "",
          otherExpendatureFalg: false,
          openLoginLoddingPanel: false,
          loading: false
        });
        Swal.fire(res[0].msg);
      }
    });
  }

  return (
    <div className="">
      {/* <Header/> */}
      {/* {console.log(State_.selectOption)} */}
      <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={clossAddExpendature}>
        <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
        <p style={{ width: 'fit-content',  margin: '1px',float: 'left', fontSize: '15px' }}>Back</p>
      </div>
      <Paper className={classes.root}>
        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <p className={classes.close} onClick={clossAddExpendature}>
            X
          </p>
        </div> */}
        {/* <Typography variant="h5" component="h3"> */}
        {/* <h3 className={classes.h2}>Current Date Expensive</h3> */}
        {/* <p className={classes.formtext}>Expendature Name</p> */}
        {/* <input type="text" placeholder="enter expendature" /> */}
        {/* <TextField
          id="standard-password-input"
          label="Expendature"
          // className={classes.textField}
          type="text"
          autoComplete="current-password"
          margin="normal"
        /> */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Select
            className="expendature-select"
            value={State_.selectOption}
            onChange={e => expensiveChangeHandle("selectOption", e)}
            options={options}
          />
        </div>
        {/* <select
          name="selectOption"
          placeholder="Select Expendature"
          onChange={e => expensiveChangeHandle("selectOption", e)}
        >
          <option
            value=""
            disabled={true}
            selected={true}
            style={{ color: "white" }}
          >
            Select Expendature
          </option>
          <option value="other">Other</option>
          <option value="1">Food</option>
          <option value="2">Car Service</option>
          <option value="3">Bike Service</option>
          <option value="4">Fuel</option>
          <option value="5">School Fee</option>
          <option value="6">Tuition Fee</option>
          <option value="7">Kamety</option>
          <option value="8">Bike Wash</option>
          <option value="9">Car Wash</option>
          <option value="10">House Rent</option>
          <option value="11">Home glosry</option>
        </select>
        */}
        {/* <p className={classes.formtext}>Money</p> */}
        {/* <input type="text" placeholder="enter Money" /> */}
        {State_.otherExpendatureFalg && (
          <TextField
            className={classes.text}
            id="standard-password-input"
            label="Expendature Name"
            // className={classes.textField}
            type="text"
            value={State_.expendatureName}
            onChange={e => changeTextHandle("expendatureName", e)}
            autoComplete="current-password"
            margin="normal"
          />
        )}
        <TextField
          className={classes.text}
          id="standard-password-input"
          label="Money"
          // className={classes.textField}
          type="number"
          value={State_.Money}
          onChange={e => changeTextHandle("Money", e)}
          autoComplete="current-password"
          margin="normal"
        />

        <p className={classes.btn}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submitExpendatureBtn}
          >
            Add
          </Button>
        </p>
        <p>{State_.Error}</p>
        {/* </Typography> */}
      </Paper>
      <Loader openLoaderPanel={State_.openLoginLoddingPanel} openLoader={State_.loading} />

      {/* <Dialog
        // open={true}
        open={State_.openLoginLoddingPanel}
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
              loading={State_.loading}
              // loading={true}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
     */}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    AuthData: state.authData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addexpendature: data => dispatch(addexpendature(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpensive);
