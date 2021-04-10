import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const LOGIN_USER = `login_user`;
export const REGISTER_USER = `register_user`;

export function loginUser(loginInfo) {
  const request = axios
    .post(`${process.env.REACT_APP_API_HOST}/auth/login`, loginInfo)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(registerInfo) {
  const request = axios
    .post(`${process.env.REACT_APP_API_HOST}/auth/register`, registerInfo)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
