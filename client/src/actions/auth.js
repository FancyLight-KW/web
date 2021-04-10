export const AUTH_USER = "auth_user";
export const LOGOUT_USER = "logout_user";

export function authUser(decodedUserInfo) {
  return {
    type: AUTH_USER,
    payload: decodedUserInfo,
  };
}
export function logOutUser() {
  return {
    type: LOGOUT_USER,
  };
}
