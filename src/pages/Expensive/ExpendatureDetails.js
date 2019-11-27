import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { getcurrentmonthstatus } from "../../Redux/acion/CurrentMonthStatusAction.js";
import "./addexpensive.css";
import Loader from "../Loader/Loader.js";
import back_icon from "../../image/back-icon.png";
// import UpdateExpendatureDetails from "./UpdateExpendatureDetails.js";
import expendature_icon from "../../image/expens-detail-icon.png";
// import DialogActions from '@material-ui/core/DialogActions';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { deleteexpendature } from "../../Redux/acion/ExpendatureAction.js";
import Swal from "sweetalert2";
import Header from '../Header/Header'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
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
    fontSize: "19px",
    marginTop: "8px"
  }
}));

function ExpendatureDetails(props) {
  const classes = useStyles();

  let [State_, setValues] = useState({
    StausData: [],
    openUpdate: false,
    deletePanel: false,
    deleteArray: [],
    loading: false,
    openLoginLoddingPanel: false,
    loading: false,
    View: false,
    delete: false,
    // TotalMoney: ""
  });
  function getData() {
    let params = {
      loginKey: props.authData.LoginKey,
      email: props.authData.Email
    };
    setValues({ ...State_, loading: true });
    setValues({ ...State_, openLoginLoddingPanel: true, loading: true });

    props.getcurrentmonthstatus(params).then(res => {
      console.log(res);
      setValues({
        ...State_,
        deletePanel: false,
        StausData: res,
        // TotalMoney: res[1][0].TotalMoney,
        loading: false,
        openLoginLoddingPanel: false,
        loading: false
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
    console.log(values);

    setValues({ ...State_, deletePanel: true, deleteArray: values, delete: true });
  }

  function cancleDeleteHandle() {
    setValues({ ...State_, deletePanel: false, View: false, delete: false });
  }
  function openViewhandle(values, flage) {
    setValues({
      ...State_,
      deletePanel: true,
      deleteArray: values,
      View: flage
    });
  }

  function closeExdendDetailHandle() {
    props.history.replace("/userhome");
  }

  function deleteHandle() {
    let array_obj = State_.deleteArray;
    setValues({ ...State_, openLoginLoddingPanel: true, loading: true });

    // console.log(props);
    let params = {
      array_obj,
      loginKey: props.authData.LoginKey,
      Email: props.authData.Email
    };
    props.deleteexpendature(params).then(res => {
      // console.log(res);
      setValues({
        ...State_,
        deletePanel: false,
        deleteArray: "",
        openLoginLoddingPanel: false,
        loading: false
      });
      // setTimeout(() => {
      Swal.fire(res[0].msg);
      getData();
      // }, 1000);
    });
  }

  return (
    <div className="">
      {/* <Header/> */}
      {console.log(State_.deletePanel)}
      <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={closeExdendDetailHandle}>
        <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
        <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
      </div>
      <div className='expendature-detail'>
        {State_.StausData.map(items => {
          return (
            <>
              <div className="d-flex alert alert-primary p-0  border border-secondary rounded h-75 d-inline-block my-3">
                <div className='mr-auto p-2 align-self-start h-75'>
                  <p className="expendature-name">
                    {items.ExpendatureName.length >= 15
                      ? // ? items.ExpendatureName
                      `${items.ExpendatureName.substr(0, 5)}... ${items.Date}`
                      : (`${items.ExpendatureName} (${items.Date} ${items.Month} ${items.Year})`)
                    }
                  </p>
                </div>
                <div className=' d-flex p-2 w-25 align-self-end h-75'>
                  <div className="p-2">
                    <span
                      className="glyphicon glyphicon-trash"
                      onClick={() => openDeletehandle(items, true)}
                    ></span>
                  </div>
                  <div className="p-2">
                    <span
                      className="glyphicon glyphicon-eye-open"
                      onClick={() => openViewhandle(items, true)}
                    ></span>
                  </div>
                </div>
              </div>
            </>
            // <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 expendature-detail-card-main">
            //   <div className="subcard">
            //     <div className="expnsive-icon">
            //       <img src={expendature_icon} />
            //     </div>
            //     {/* <p className="expendature-name">{ items.ExpendatureName}</p> */}
            //     <p className="expendature-name">
            //       {items.ExpendatureName.length >= 7
            //         ? // ? items.ExpendatureName
            //         `${items.ExpendatureName.substr(0, 5)}...`
            //         : items.ExpendatureName}
            //       {/* : (undefined)} */}
            //     </p>
            //     <p className="expendature-delete-icon">
            //       <span
            //         className="glyphicon glyphicon-trash"
            //         onClick={() => openDeletehandle(items,true)}
            //       ></span>
            //     </p>
            //     <p className="expendature-view-icon">
            //       <span
            //         className="glyphicon glyphicon-eye-open"
            //         onClick={() => openViewhandle(items, true)}
            //       ></span>
            //     </p>
            //   </div>
            // </div>

          );
        })}
      </div>
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
              <span>Expendature Name : </span>
              {State_.deleteArray.ExpendatureName}
            </p>
            <p>
              <span>Date : </span>
              {State_.deleteArray.Date} {State_.deleteArray.Month} {State_.deleteArray.Year}
            </p>
            <p>
              <span>Money : </span>
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
            {State_.delete && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={deleteHandle}
              >
                Delete
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={cancleDeleteHandle}
            >
              cancle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Loader
        openLoaderPanel={State_.openLoginLoddingPanel}
        openLoader={State_.loading}
      />

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
