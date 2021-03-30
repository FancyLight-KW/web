import axios from "axios";

export const LOGIN_USER = "login_user";
export const REGISTER_USER = "register_user";

export function loginUser(loginInfo) {
  const request = axios
    .post("http://localhost:5000/auth/login", loginInfo)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(registerInfo) {
  const request = axios
    .post("http://localhost:5000/auth/register", registerInfo)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
