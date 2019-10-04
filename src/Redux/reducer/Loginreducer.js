import { LOGIN, LOGOUT } from "../acion/LoginAction.js";

const initialState = {
  Auth: {
    LoginKey: "",
    Email: "",
    LoginKeyFlag: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload);
      return {
        ...state,
        Auth: {
          LoginKey: action.payload.loginKey_,
          Email: action.payload.email,
          LoginKeyFlag: true
        }
      };
    case LOGOUT:
      console.log("ok");
      return {
        // ...state,
        Auth: { LoginKey: "", Email: "", LoginKeyFlag: false }
      };

    default:
      return state;
  }
};
