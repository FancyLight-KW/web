import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/user";

function RegisterPage() {
  const dispatch = useDispatch();

  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
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

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      User_id: ID,
      User_password: Password,
      User_name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        alert("회원가입이 완료됐습니다.");
      } else {
        alert(response.payload.message);
      }
    });

    // axios
    //   .post("http://localhost:5000/register", {
    //     User_ID: EmailReg,
    //     User_PWD: PasswordReg,
    //     User_Name: NameReg,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  // const submit = () => {
  //   // if (PasswordReg !== ConfirmPasswordReg) {
  //   //   return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
  //   // }
  //   // console.log("hello");
  //   // axios.post('http://localhost:5000/register', {
  //   //   email: EmailReg,
  //   //   name: NameReg,
  //   //   password: PasswordReg,
  //   // }).then((response) => {
  //   //   console.log(response);
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confrim Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button>회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
