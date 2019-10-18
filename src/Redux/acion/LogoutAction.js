import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";

export const LOGOUT = "LOGOUT";

export const logout = params => dispatch => {
    // console.log(params);
    return new Promise((resolve, reject) => {
      FetchUtil({
        url: appendQueryParams(`/user/logout?LoginKey=${params.loginKey}`),
        method: "POST",
        body: JSON.stringify({
          params
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          // console.log(res, "add Deparments action response");
  
          resolve(res);
          // console.log(res)
          if(res[0].msg === "Logout"){
              // console.log("abc")
              let key = "destroy";
              dispatch({ type: LOGOUT ,payload: key });
          }else{
            // console.log("xyz")
          dispatch({ type: LOGOUT });
          }
        })
        .catch(err => {
          reject({ message: err });
        });
    });
  };