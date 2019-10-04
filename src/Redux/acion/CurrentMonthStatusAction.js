import { FetchUtil } from "../../utilfunction/FetchUtils.js";
import { appendQueryParams } from "../../utilfunction/UrlUtils.js";


export const GETCURRENTMONTHSTATUS = "GETCURRENTMONTHSTATUS";

export const getcurrentmonthstatus = params => dispatch => {
  // console.log(params);
  return new Promise((resolve, reject) => {
    FetchUtil({
      url: appendQueryParams(`/user/get/currentstatus?useremail=${params.email}&loginKey=${params.loginKey}`),
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // console.log(res);

        resolve(res);

        dispatch({ type: GETCURRENTMONTHSTATUS, });
      })
      .catch(err => {
        reject({ message: err });
      });
  });
};