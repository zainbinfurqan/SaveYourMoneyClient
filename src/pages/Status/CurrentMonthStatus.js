import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { getcurrentmonthstatus } from "../../Redux/acion/CurrentMonthStatusAction.js";
// import { Document, Page, Text, View, StyleSheet } from 'react-pdf';
import "./currentstatus.css";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import Pdf from "react-to-pdf";
import back_icon from '../../image/back-icon.png'

import { makeStyles } from "@material-ui/core/styles";
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
// const doc = new jsPDF();
const ref = React.createRef();
const options = {
  orientation: "potrait",
  unit: "in",
  format: [500, 700.4],
  fontsize: 20
  // unit: 'inches',
  // format: [8.27,11.69]
};
const useStyles = makeStyles(theme => ({
  btn: {
    color: "white",
    backgroundColor: "blueviolet",
    border: "solid",
    height: "38px",
    borderRadius: "6px"
  }
}));

function CurrentMonthStatus(props) {
  const classes = useStyles();

  let [State_, setValues] = useState({
    StausData: [],
    TotalMoney: "",
    Name: "",
    Email: "",
    loading:false
  });

  function closeStatusHandle() {
    props.history.replace("/userhome");
  }

  useEffect(() => {
    console.log(props);
    if (props.authData.LoginKeyFlag !== false) {
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
  useEffect(() => {
    
    // console.log(props);
    if (props.authData.LoginKeyFlag !== false) {
      setValues({...State_,loading:true })
      let params = {
        loginKey: props.authData.LoginKey,
        email: props.authData.Email
      };
      props.getcurrentmonthstatus(params).then(res => {
        console.log(res);
        setValues({
          ...State_,
          StausData: res[0],
          TotalMoney: res[1][0].TotalMoney,
          Email: props.authData.Email,
          loading:false
        });
      });
    } else {
      props.history.replace("/home");
    }
  }, []);

  useEffect(() => {}, []);
  // function downloadPDF() {
  //   console.log("download");
  //   doc.autoTable({ html: "#my-table" });
  //   doc.save("table.pdf");
  // }

  return (
    <div className="row currentStatus">
      {console.log(State_.Email)}
      <p onClick={closeStatusHandle}>
        {/* X */}
        <img src={back_icon} />

        </p>
      <div className="container" ref={ref}>
        <div className="pdf-page">
          {/* <h2>Current Month Statement</h2> */}
          <h2 className="">E-STATEMENT OF MONTH</h2>
          <div className="profile-detail">
            {/* <p>
              <span>Name: </span>
            </p> */}
            <p>
              <span>Email: {State_.Email}</span>
            </p>
          </div>
          <table className="statusTable table-striped">
            <thead>
              <tr>
                <td>Expendature Name</td>
                <td>Expendature</td>
                <td>Date</td>
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
                  </tr>
                );
              })}
              <tr className="totalmoney-tr">
                <td>Total</td>
                <td></td>
                <td>{State_.TotalMoney}</td>
              </tr>
            </tbody>
          </table>
      
        </div>
        {/* <p onClick={downloadPDF}>Download PDF</p> */}
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "right",
          margin: "0px 23px 0px 0px"
        }}
      >
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={State_.loading}
        />
        {/* <Pdf targetRef={ref} options={options} filename="code-example.pdf">
          {({ toPdf }) => (
            <button className={classes.btn} onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf> */}
      </div>
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
    getcurrentmonthstatus: data => dispatch(getcurrentmonthstatus(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMonthStatus);
