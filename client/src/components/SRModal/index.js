import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/user";
import { authUser } from "../../actions/auth";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
// import CloseButton from "./CloseButton";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";

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
// RGB(236, 236, 236)
const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 700px;
  max-width: 700px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;
const ContentWrapper = styled.div`
display: flex,
text-align: center,
width: 100%,
flex-direction: column,
`;
const TypeText = styled.div`
  margin: 24px 0px 20px;
  font-size: 17px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 700;
`;
const SRInfoBlock = styled.div`
    display:flex;
    width: 100%
    height: 20%
`;
const SRImageBlock = styled.div`
display:flex;
width: 100%
height: 20%
`;
const SRInfoSpan = styled.span`
  display: flex;
  width: 18%;
  color: #0069c0;
  padding-left: 5px;
  padding-top: 20px;
  background-color: whitesmoke;
`;
const SRInfoDiv = styled.div`
  padding-left: 5px;
  padding-top: 20px;
  width: 72%;
`;
const SRConentDiv = styled.div`
  padding-left: 5px;
  padding-top: 20px;
  width: 70%;
  word-break: break-all;
`;
const SRConentSpan = styled.span`
  display: flex;
  width: 18%;
  color: #0069c0;
  padding-top: 20px;
  background-color: whitesmoke;
  padding-left: 5px;
  height: 200px;
`;

function SRModal({
  requestInfos,
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
  //axios.defaults.withCredentials = true;

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 새로고침 방지
  };
  // let body = {
  //   User_id: ID,
  //   User_password: Password,
  // };

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
          <ContentWrapper>
            <TypeText>
              <SRInfoBlock>
                <SRInfoSpan>제목</SRInfoSpan>
                <SRInfoDiv> {requestInfos.TITLE}</SRInfoDiv>
              </SRInfoBlock>
              <SRInfoBlock>
                <SRInfoSpan>요청 날짜</SRInfoSpan>
                <SRInfoDiv> {requestInfos.createdAt}</SRInfoDiv>
              </SRInfoBlock>
              <SRInfoBlock>
                <SRInfoSpan>요청 사원</SRInfoSpan>
                <SRInfoDiv> {requestInfos.REG_USER_ID}</SRInfoDiv>
              </SRInfoBlock>
              <SRInfoBlock>
                <SRInfoSpan>접수 상태</SRInfoSpan>
                <SRInfoDiv> {requestInfos.CSR_STATUS}</SRInfoDiv>
              </SRInfoBlock>
              <SRInfoBlock>
                <SRConentSpan>내용</SRConentSpan>
                <SRConentDiv> {requestInfos.CONTENT}</SRConentDiv>
              </SRInfoBlock>
            </TypeText>
            <form onSubmit={onSubmitHandler}></form>
            <SRImageBlock></SRImageBlock>
            {children}
          </ContentWrapper>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

SRModal.propTypes = {
  visible: PropTypes.bool,
};

export default SRModal;
