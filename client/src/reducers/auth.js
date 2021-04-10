import { AUTH_USER, LOGOUT_USER } from "../actions/auth";

const initialState = {
  User_id: "",
  User_name: "",
  User_lastlogin: "",
  User_position: null,
  iat: null,
  exp: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      // return { UserInfos: action.payload };
      return { ...state, userInfos: action.payload };
    case LOGOUT_USER:
      return { userInfos: initialState };
    default:
      return state;
  }
}
