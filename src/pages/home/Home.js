import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Loader from '../Loader/Loader.js'
import login_icn from '../../image/login-icon.png';
import signup_icn from '../../image/sigup-icon.png'

// import Typography from "@material-ui/core/Typography";
// import CardActions from '@material-ui/core/CardActions';
// import { FetchUtil } from "../../utilfunction/FetchUtils.js";
// import { appendQueryParams } from "../../utilfunction/UrlUtils.js";
import CardContent from "@material-ui/core/CardContent";
// import Login from "../Auth/Login.js";
// import SignUp from "../Auth/SignUp.js";
const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: "auto",
    marginTop: 50,
    height: 350
  },
  logincard: {
    minWidth: 275,
    margin: "auto",
    marginTop: 55,
    height: 120,
    marginBottom: "0px"
  },
  root: {
    padding: theme.spacing(3, 2),
    // margin: "25px 5px",
    height: 115,
    width: "100%",
    margin: "auto",
    marginTop: "30px"
  },
  registrationcard: {
    minWidth: 275,
    margin: "auto",
    marginTop: 55,
    height: 120
  },
  cardContent: {
    margin: "17px 0px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  h2:{
    width: 'fit-content',
    float: 'left',
    margin: '15px 15px'
  }
}));

function Home(props) {
  const classes = useStyles();

  let [State_, setStateValue] = useState({
    openLoginFlag: false,
    openSignUpFlag: false,
    loginKeyFlag: ""
  });

  useEffect(() => {
    //   console.log(props.AuthData.Auth.LoginKey)
    if (props.AuthData.Auth.LoginKey.length !== "") {
      setStateValue((State_.loginKeyFlag = true));
    } else {
      console.log("ok");

      setStateValue({ ...State_, loginKeyFlag: false });
    }
  }, []);

  function openloginPanelHandle() {
    console.log("abc");
    // console.log(props)
    props.history.replace("/login");
    // setStateValue({...State_,openLoginFlag : true });
  }

  function openSignUpPanelHandle() {
    // setStateValue({...State_,openSignUpFlag : true });
    props.history.replace("/signup");
  }

  // function close() {
  //   setStateValue({ ...State_, openLoginFlag: false, openSignUpFlag: false });
  // }

  return (
    <div className="row homecontainer">
      {/* {console.log(State_.loginKeyFlag)} */}
      {/* <div className="login"> */}
      {State_.loginKeyFlag && (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}></CardContent>
        </Card>
      )}
      {!State_.loginKeyFlag && (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Paper className={classes.root} onClick={openloginPanelHandle}>
              <img src={login_icn} className='home-login-icn' /> <h2 className={classes.h2}>LOGIN</h2>
            </Paper>
            <Paper className={classes.root} onClick={openSignUpPanelHandle}>
              <img src={signup_icn} className='home-login-icn' /> <h2  className={classes.h2}>  SignUp</h2>
            </Paper>
          </CardContent>
        </Card>
      )}
      {/* <Loader openLoaderPanel={true} openLoader={true} /> */}
      {/* {State_.openLoginFlag && (
        <Login open={State_.openLoginFlag} close={close} />
      )}
      {State_.openSignUpFlag && (
        <SignUp open={State_.openSignUpFlag} close={close} />
      )} */}
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

//mapDispatchToProps is for SetRoles
// const mapDispatchToProps = dispatch => {
//   return {
//     addDepartments: data => dispatch(addDepartments(data)),
//     updateDepartments: data => dispatch(updateDepartments(data)),
//     deleteDepartments: data => dispatch(deleteDepartments(data))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Home);
