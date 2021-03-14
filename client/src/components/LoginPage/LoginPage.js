import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user";

import axios from "axios";

function LoginPage() {
  // useEffect(() => {
  //   axios.get("http://localhost:3000/login").then((response) => {
  //     if (response.data.loggedIn == true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  const dispatch = useDispatch();
  //axios.defaults.withCredentials = true;

  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 새로고침 방지

    let body = {
      User_id: ID,
      User_password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.message) {
        alert("이메일 혹은 비밀번호가 다릅니다.");
      } else {
        //alert(response.payload.User_id);
      }
    });
  };

  // axios
  //   .post("http://localhost:5000/login", {
  //     email: Email,
  //     password: Password,
  //   })
  //   .then((response) => {
  //     if (response.data.message) {
  //       alert("이메일 혹은 비밀번호가 다릅니다.");
  //     } else {
  //       console.log(response);
  //       return alert(response.data[0].User_ID);
  //     }
  //   });
  // };

  // const login = () => {
  //   // axios.post('http://localhost:5000/login', {
  //   //   email: Email,
  //   //   password: Password,
  //   // }).then((response) => {
  //   //   if(response.data.message){
  //   //     alert("이메일 혹은 비밀번호가 다릅니다.");
  //   //   } else {
  //   //     console.log(response);
  //   //     return alert(response.data[0].User_ID);
  //   //   }
  //   // });
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>ID</label>
        <input type="text" value={ID} onChange={onIDHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
