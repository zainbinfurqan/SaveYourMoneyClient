import {
  ADDEXPENDATURE,
  DELETEEXPENDATURE
} from "../acion/ExpendatureAction.js";

// const initialState = {
//   Auth: {
//     LoginKey: ""
//   }
// };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDEXPENDATURE:
      // console.log(action.payload);
      return {
        ...state
        // Auth: { LoginKey: action.payload }
      };
    case DELETEEXPENDATURE:
      // console.log(action.payload);
      return {
        ...state
        // Auth: { LoginKey: action.payload }
      };
    default:
      return state;
  }
};
