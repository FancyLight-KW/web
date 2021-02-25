import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  // const dispatch = useDispatch();

  const [EmailReg, setEmail] = useState("");
  const [NameReg, setName] = useState("");
  const [PasswordReg, setPassword] = useState("");
  const [ConfirmPasswordReg, setConfirmPassword] = useState("");
  

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (PasswordReg !== ConfirmPasswordReg) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
  };

  const submit = () => {
    
    // if (PasswordReg !== ConfirmPasswordReg) {
    //   return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    // }
    console.log("hello");
    axios.post('http://localhost:5000/register', {
      email: EmailReg,
      name: NameReg, 
      password: PasswordReg,
    }).then((response) => {
      console.log(response);
    });
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
        <input type="email" value={EmailReg} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={NameReg} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={PasswordReg} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPasswordReg}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button onClick={submit}>회원 가입</button>
      </form>

    </div>
  );
}

export default RegisterPage;
