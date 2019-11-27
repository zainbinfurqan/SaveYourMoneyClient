import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Loader from '../Loader/Loader.js'
import login_icn from '../../image/login-icon.png';
import signup_icn from '../../image/sigup-icon.png'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import WebHome from '../WebHome/WebHome'
import intro from '../../image/LogoGif.gif'

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
  h2: {
    width: 'fit-content',
    float: 'left',
    margin: '15px 15px'
  },
  guide_span: {
    fontWeight: '700'
  }
}));
const guideData = [
  {
    text_1: 'You can create account simply by register, no google,facebook authentication on this version  you can create acount by any email id on',
    text_2: ' registeration feature'
  },
  {
    text_1: 'This app is for accontibility for your daily and monthly bases expensives',
    text_2: ''
  },
  {
    text_1: 'You can insert you expendature on',
    text_2: 'add expendature',
    text_3: 'feature with predefine select options or can mannualy enter expendature name and price'
  },
  {
    text_1: 'You can view monthly details of total expendature with total money and expendature details like date, name, price on ',
    text_2: 'current status month',
    text_3: 'feature'
  },
  {
    text_1: 'You can delete expendature on ',
    text_2: 'details expendature',
    text_3: 'feature'
  },
  {
    text_1: 'You can chnage password or delete your account on',
    text_2: 'setting',
    text_3: 'feature'

  },
  {
    text_1: 'You can view any month expendature details by select month on',
    text_2: 'select month',
    text_3: 'feature'
  },
]
function Home(props) {
  const classes = useStyles();

  let [State_, setStateValue] = useState({
    openLoginFlag: false,
    openSignUpFlag: false,
    loginKeyFlag: true,
    openGuide: false,

  });

  useEffect(() => {
    // console.log(props.AuthData.Auth.LoginKey)
    if (props.AuthData.Auth.LoginKey) {
      setStateValue({ ...State_, loginKeyFlag: true });
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

  function handleGuide() {
    setStateValue({ ...State_, openGuide: State_.openGuide ? false : true });

  }
  function goToHome(){
    props.history.replace("/userhome");

  }

  // function close() {
  //   setStateValue({ ...State_, openLoginFlag: false, openSignUpFlag: false });
  // }

  return (
    <div className="row homecontainer">
      {console.log(State_.loginKeyFlag)}
      {/* <div className="login"> */}
      {State_.loginKeyFlag && (

        // <WebHome/>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>

            <div onClick={goToHome}> <h2 style={{
              margin: '0px 0px 10px 0px',
              fontSize: '20px'
            }}>Go to menu <i style={{ fontSize: '17px' }} className="fas fa-arrow-alt-circle-right" /> </h2>
            </div>
            <div className="intro-main">
              <img src={intro} />
            </div></CardContent>
        </Card>
      )
      }
      {
        !State_.loginKeyFlag && (
          <Card className={classes.card}>
            {
              console.log("abc")

            }
            <CardContent className={classes.cardContent}>
              <Paper className={classes.root} onClick={openloginPanelHandle}>
                <img src={login_icn} className='home-login-icn' /> <h2 className={classes.h2}>LOGIN</h2>
              </Paper>
              <Paper className={classes.root} onClick={openSignUpPanelHandle}>
                <img src={signup_icn} className='home-login-icn' /> <h2 className={classes.h2}>SignUp</h2>
              </Paper>
              <i className="fas fa-caret-right" style={{ float: 'right', margin: '4px 0px 0px 5px', fontSize: '23px' }} />

              <p style={{ float: 'right', fontWeight: '600', margin: '5px 0px' }} onClick={handleGuide}>Guide
            </p>

            </CardContent>

          </Card>
        )
      }
      <Dialog
        open={State_.openGuide}
        onClose={handleGuide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div>
            <h5 style={{ textAlign: 'center' }}>Guide</h5>
            {guideData.map(items => {
              return (

                <p><span className={classes.guide_span}>-></span>{items.text_1} <span className={classes.guide_span}>{items.text_2}</span> {items.text_3} </p>
              )
            })}
            {/* <p><span className={classes.guide_span}>-></span> You can create account simply by register, no google,facebook authentication on this version  you can create acount by any email id on <span className={classes.guide_span}>registeration feature</span></p>
            <p><span className={classes.guide_span}>-></span> This app is for accontibility for your daily and monthly bases expensives</p>
            <p><span className={classes.guide_span}>-></span> You can insert you expendature on add <span className={classes.guide_span}>expendature</span> feature with predefine select options or can mannualy enter expendature name and price</p>
            <p><span className={classes.guide_span}>-></span> You can view monthly details of total expendature with total money and expendature details like date, name, price on <span>current status month feature</span></p>
            <p><span className={classes.guide_span}>-></span> You can delete expendature on <span className={classes.guide_span}>details expendature</span> feature</p>
            <p><span className={classes.guide_span}>-></span> You can chnage password or delete your account on <span className={classes.guide_span}>setting</span> feature</p>
            <p><span className={classes.guide_span}>-></span> You can view any month expendature details by select month on <span className={classes.guide_span}>select month</span> feature</p> */}
          </div>
        </DialogContent>

      </Dialog>
      {/* <Loader openLoaderPanel={true} openLoader={true} /> */}
      {/* {State_.openLoginFlag && (
        <Login open={State_.openLoginFlag} close={close} />
      )}
      {State_.openSignUpFlag && (
        <SignUp open={State_.openSignUpFlag} close={close} />
      )} */}

    </div >
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