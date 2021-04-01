import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/user";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
// import CloseButton from "./CloseButton";

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const LogoBox = styled.div`
  margin: 0px 0px 14px;
`;
const TypeText = styled.div`
  margin: 24px 0px 20px;
  font-size: 17px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 700;
`;

const FormOutWrapper = styled.div`
  padding: 2px 0px;
  overflow: hidden;
`;
const FormBox = styled.label`
  display: flex;
  align-items: center;
  background: rgb(245, 245, 245);
  box-sizing: border-box;
  width: 230px;
  height: 44px;
  padding: 0px 2px;
  border-radius: 6px;
`;
const FormInnerWrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
`;
const FormInput = styled.input`
  background: transparent;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.6px;
  line-height: 21px;
  width: 100%;
  padding: 0px;
  border: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 35px;
  &:input:focus {
    outline-offset: 0;
  }
`;
const SubmitButton = styled.button`
  padding: 0px;
  border: none;
  cursor: pointer;
  background: #0069c0;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.7px;
  line-height: 22px;
  width: 100%;
  height: 44px;
  border-radius: 6px;
  margin: 16px 0px 0px;
`;

function RegisterModal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };
  //    {closable && <div className="modal-close" onClick={close}></div>}

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
        onClose();
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div>
              <LogoBox>
                <img src={Logo} width="200px" height="50" />
              </LogoBox>
              <TypeText>
                <h4>회원가입</h4>
              </TypeText>
              <form onSubmit={onSubmitHandler}>
                <FormOutWrapper>
                  <FormBox>
                    <FormInnerWrapper>
                      <FormInput
                        placeholder="아이디"
                        type="text"
                        value={ID}
                        onChange={onIDHandler}
                      />
                    </FormInnerWrapper>
                  </FormBox>
                </FormOutWrapper>

                <FormOutWrapper>
                  <FormBox>
                    <FormInnerWrapper>
                      <FormInput
                        placeholder="이름"
                        type="text"
                        value={Name}
                        onChange={onNameHandler}
                      />
                    </FormInnerWrapper>
                  </FormBox>
                </FormOutWrapper>

                <FormOutWrapper>
                  <FormBox>
                    <FormInnerWrapper>
                      <FormInput
                        placeholder="비밀번호"
                        type="password"
                        value={Password}
                        onChange={onPasswordHandler}
                      />
                    </FormInnerWrapper>
                  </FormBox>
                </FormOutWrapper>

                <FormOutWrapper>
                  <FormBox>
                    <FormInnerWrapper>
                      <FormInput
                        placeholder="비밀번호 확인"
                        type="password"
                        value={ConfirmPassword}
                        onChange={onConfirmPasswordHandler}
                      />
                    </FormInnerWrapper>
                  </FormBox>
                </FormOutWrapper>
                <SubmitButton type="submit">회원가입</SubmitButton>
              </form>
            </div>
            {children}
          </div>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

RegisterModal.propTypes = {
  visible: PropTypes.bool,
};

export default RegisterModal;
