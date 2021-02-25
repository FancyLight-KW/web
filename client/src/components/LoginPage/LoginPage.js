import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  // const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        email: Email,
        password: Password,
      })
      .then((response) => {
        if (response.data.message) {
          alert("이메일 혹은 비밀번호가 다릅니다.");
        } else {
          console.log(response);
          return alert(response.data[0].User_ID);
        }
      });
  };

  const login = () => {
    // axios.post('http://localhost:5000/login', {
    //   email: Email,
    //   password: Password,
    // }).then((response) => {
    //   if(response.data.message){
    //     alert("이메일 혹은 비밀번호가 다릅니다.");
    //   } else {
    //     console.log(response);
    //     return alert(response.data[0].User_ID);
    //   }
    // });
  };

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
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
