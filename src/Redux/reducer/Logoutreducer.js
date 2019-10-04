import { LOGOUT } from "../acion/LogoutAction.js";

const initialState = {
  // Auth: {
  //   LoginKey: ""
  // }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      console.log("ok");
      return {
        ...state,
        // Auth: { LoginKey: "" }
      };

    default:
      return state;
  }
};
