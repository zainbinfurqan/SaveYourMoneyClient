import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getcurrentmonthstatus } from "../../Redux/acion/CurrentMonthStatusAction.js";
import "./addexpensive.css";
// import UpdateExpendatureDetails from "./UpdateExpendatureDetails.js";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deleteexpendature } from "../../Redux/acion/ExpendatureAction.js";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    width: 100
  },
  close: {
    float: "left",
    cursor: "pointer",
    margin: "0",
    width: "fit-content",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer"
  }
}));

function ExpendatureDetails(props) {
  const classes = useStyles();

  let [State_, setValues] = useState({
    StausData: [],
    openUpdate: false,
    deletePanel: false,
    deleteArray: []
    // TotalMoney: ""
  });
  function getData() {
    let params = {
      loginKey: props.authData.LoginKey,
      email: props.authData.Email
    };
    props.getcurrentmonthstatus(params).then(res => {
      // console.log(res);
      setValues({
        ...State_,
        deletePanel: false,
        StausData: res[0],
        TotalMoney: res[1][0].TotalMoney
      });
    });
  }

  useEffect(() => {
    if (props.authData.LoginKeyFlag !== false) {
      getData();
    } else {
      props.history.replace("/home");
    }
  }, []);
  useEffect(() => {
    if (props.authData.LoginKeyFlag !== false) {
    } else {
      props.history.replace("/home");
    }
  });

  function openUpdatePanelHandle() {
    // console.log("abc");
    setValues({ ...State_, openUpdate: true });
  }
  function closeUpdate() {
    setValues({ ...State_, openUpdate: false });
  }

  function openDeletehandle(values) {
    // console.log(values);

    setValues({ ...State_, deletePanel: true, deleteArray: values });
  }

  function cancleDeleteHandle() {
    setValues({ ...State_, deletePanel: false });
  }

  function closeExdendDetailHandle() {
    props.history.replace("/userhome");
  }

  function deleteHandle() {
    let array_obj = State_.deleteArray;
    console.log(props);
    let params = {
      array_obj,
      loginKey: props.authData.LoginKey,
      Email: props.authData.Email
    };
    props.deleteexpendature(params).then(res => {
      // console.log(res);
      setValues({ ...State_, deletePanel: false, deleteArray: "" });
      // setTimeout(() => {
      Swal.fire(res[0].msg);
      getData();
      // }, 1000);
    });
  }

  return (
    <div className="container">
      {console.log(State_.deletePanel)}
      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
      <p className={classes.close} onClick={closeExdendDetailHandle}>
        X
      </p>
      </div>
      {/* <h2>Expendature Details</h2> */}
      {/* {console.log(State_.deletePanel)} */}
      {State_.StausData.map(items => {
        return (
          <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 expendature-detail-card-main">
            <div className="subcard">
              <p className='expendature-name'>{items.ExpendatureName}</p>
              <p className='expendature-delete-icon'>
                <span
                  class="glyphicon glyphicon-trash"
                  onClick={() => openDeletehandle(items)}
                ></span>
              </p>
            </div>
          </div>
        );
      })}
      {/* {State_.StausData.map(items => {
        return (
          <div className="expendature-detail-card-main">
            <h4>{items.ExpendatureName}</h4>
            <div className="extendature-card-detail">
              <p>
                Date:
                <span>
                  {items.Date}-{items.Month}-{items.Year}
                </span>
              </p>
              <p>
                Cost: <spna>{items.Money}</spna>
              </p>
            </div>
            <div className="extendature-delete-icon">
              <span
                class="glyphicon glyphicon-trash"
                onClick={() => openDeletehandle(items)}
              ></span>
            </div>
          </div>
        );
      })} */}
      {/* <table className="statusTable table-striped">
        <thead>
          <tr>
            <td>ExpendName</td>
            <td>Date</td>
            <td>Money</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {State_.StausData.map(items => {
            return (
              <tr>
                <td>{items.ExpendatureName}</td>
                <td>
                  {items.Date}-{items.Month}-{items.Year}
                </td>
                <td>{items.Money}</td>
                <td>
                  <span
                    class="glyphicon glyphicon-trash"
                    onClick={() => openDeletehandle(items)}
                  ></span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
     */}

      <Dialog
        open={State_.deletePanel}
        // TransitionComponent={Transition}
        // keepMounted
        className="update-main"
        // onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="update-subdiv">
            {/* {console.log(State_.deleteArray)} */}
            <p>
              <span>Expendature Name :</span>
              {State_.deleteArray.ExpendatureName}
            </p>
            <p>
              <span>Money :</span>
              {State_.deleteArray.Money}
            </p>
            {/* {State_.deleteArray.map(items_1 => {
              return (
                <p>
                  {items_1.ExpendatureName}
                  {items_1.Money}
                </p>
              );
            })} */}
            <p>You Sure You Want To Delete This Entry </p>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={deleteHandle}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={cancleDeleteHandle}
            >
              CanCle
            </Button>
          </div>
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
    deleteexpendature: data => dispatch(deleteexpendature(data)),
    getcurrentmonthstatus: data => dispatch(getcurrentmonthstatus(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpendatureDetails);
