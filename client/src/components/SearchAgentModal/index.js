import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/user";
import { authUser } from "../../actions/auth";
import axios from "axios";
import Logo from "../../assets/800px-Hyundai_Transys_logo.png";
import NoImage from "../../assets/noimage.png";
import { Table, Button } from "react-bootstrap";
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
const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 1500px;
  max-width: 1500px;
  top: 20%;
  transform: translateY(-20%);
  margin: 0 auto;
  padding: 20px 20px;
`;
const ContentWrapper = styled.div`
display: flex,
text-align: center,
width: 100%,
flex-direction: column,
`;
const LogoBox = styled.div`
  margin: 0px 0px 14px;
  display: flex;
  justify-content: center;
`;
const TypeText = styled.div`
  margin: 24px 0px 0px;
  font-size: 17px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 700;
`;
const HeadSpan = styled.span`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
`;
const AgentInfoTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-top: solid #0069c0;
`;

const SRInfoBlock = styled.div`
  display: flex;
  width: 100%;
`;
const SRImageBlock = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
`;
const SRImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SRInfoSpan = styled.span`
  display: flex;
  width: 15%;
  color: #0069c0;
  padding-left: 5px;
  padding-bottom: 20px;
  background-color: whitesmoke;
`;
const SRInfoDiv = styled.div`
  padding-left: 10px;
  width: 100%;
`;
const SRConentDiv = styled.div`
  padding-left: 10px;
  width: 100%;
  word-break: break-all;
`;
const SRConentSpan = styled.span`
  display: flex;
  width: 15%;
  color: #0069c0;
  background-color: whitesmoke;
  padding-left: 5px;
  height: 200px;
`;

function SearchAgentModal({
  requestInfos,
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  useEffect(() => {
    // const userID = JSON.stringify(
    // jwt_decode(cookie.load("token")).User_id
    // ).split('"')[1];
    //  console.log(JSON.stringify(jwt_decode(cookie.load("token"))));

    axios
      .get(`${process.env.REACT_APP_API_HOST}/admin/agentlist`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        //       setRequests([...response.data]);
      });
  }, []);

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
  //

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner>
          <LogoBox>
            <img src={Logo} width="200px" height="50" />
          </LogoBox>
          <ContentWrapper>
            <TypeText>
              <HeadSpan>※ 요원 설정</HeadSpan>
            </TypeText>
            <AgentInfoTableWrapper>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th rowSpan="2" id="thCenterAlign">
                      No
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      서비스상태
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      문의대상
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      시스템명1
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      시스템명2
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      문의유형
                    </th>
                    <th rowSpan="2" id="thCenterAlign">
                      제목
                    </th>

                    <th colSpan="3">서비스 요청</th>
                    <th colSpan="2">서비스 접수</th>
                    <th colSpan="3">서비스 검토/처리</th>
                  </tr>
                  <tr>
                    <th>부서</th>
                    <th>성명</th>
                    <th>요청등록일</th>
                    <th>성명</th>
                    <th>접수일</th>
                    <th>설명</th>
                    <th>예상완료일</th>
                    <th>처리완료일</th>
                  </tr>
                </thead>

                <tbody> </tbody>
              </Table>
            </AgentInfoTableWrapper>

            <form onSubmit={onSubmitHandler}></form>

            {children}
          </ContentWrapper>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

SearchAgentModal.propTypes = {
  visible: PropTypes.bool,
};

export default SearchAgentModal;
